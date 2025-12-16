import { toast } from "react-toastify";

let interval;

export const stagedTimers = {
    start: () => {
        if (interval) return
        let elapsed = 0;

        interval = setInterval(() => {
            elapsed +=7;

            if (elapsed === 7)
                toast.info("Waking up the server…");
            if (elapsed === 14)
                toast.info("Server is processing your request…");
            if (elapsed === 21)
                toast.info("Still working, hang tight…");
            if (elapsed === 28)
                toast.info("Our deployment is on a free tier — it might take a little longer 🙏");
            if (elapsed === 35)
                toast.info("Thanks for your patience! Just a few more seconds ⏳");
            if (elapsed ===42)
                toast.info("Almost done! Your request will be ready any moment now 🚀");
            if (elapsed === 49)
                toast.info("Finalizing everything… You’ll see the result shortly 💫");

            if (elapsed >=56) {
                toast.error("Server not responding. Please try again later.");
                stagedTimers.stop();
            }
        }, 7000);
    },

    stop: () => {
        if (!interval) return
        clearInterval(interval);
        interval = null;
    },
};