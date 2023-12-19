import toast from "react-hot-toast";

const customToast = (content: React.ReactNode) => (
  <span>
    <b>{content}</b>
  </span>
);

const success = (message: string) => {
  toast.success((t) => customToast(<div>{message}</div>));
};

const error = (message: string) => {
  toast.error((t) => customToast(<div>{message}</div>));
};

// const promise = (promise: Promise<any>, options) => {
//   return toast.promise(promise, {
//     loading: "Loading...",
//     success: (data) => customToast(<div>{options.success || data}</div>),
//     error: (error) => customToast(<div>{options.error || error.message}</div>),
//     ...options,
//   });
// };

export { success, error };
