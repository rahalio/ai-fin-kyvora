/**
 * Outbox drain worker — polls pending events and dispatches via the in-process bus.
 *
 * Safe to run in-process alongside the API or as a compose sidecar entrypoint.
 */
export function startOutboxWorker(outbox, bus, options = {}) {
    const intervalMs = options.intervalMs ?? 5_000;
    const batchSize = options.batchSize ?? 25;
    const onError = options.onError ??
        ((error) => {
            console.error("[outbox-worker] drain failed", error);
        });
    let stopped = false;
    let timer;
    async function tick() {
        const pending = await outbox.listPending(batchSize);
        for (const item of pending) {
            try {
                await bus.dispatch(item);
                await outbox.markProcessed(item);
            }
            catch (error) {
                await outbox.markFailed(item, error);
                onError(error);
            }
        }
    }
    timer = setInterval(() => {
        if (stopped)
            return;
        void tick().catch(onError);
    }, intervalMs);
    // Avoid keeping the process alive solely for the worker in tests
    if (typeof timer.unref === "function") {
        timer.unref();
    }
    return {
        stop() {
            stopped = true;
            if (timer)
                clearInterval(timer);
        },
        tick,
    };
}
