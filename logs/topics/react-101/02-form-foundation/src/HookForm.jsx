import { useForm } from "react-hook-form";
const ROLES = ["Prompt Engineer", "Frontend", "Backend"];

const HookForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        getValues,
    } = useForm({ defaultValues: { name: "Harsh" }, mode: "onTouched" });
    // mode is used to determine the validation strategy befor a user
    // onTouched - validation tb jab user touch kre

    function submit(data) {
        return new Promise((res) => console.log("Submitted ", data));
    }
    if (isSubmitSuccessful) {
        return (
            <div>
                <h1>Form submitted successfully</h1>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <label>
                    Full Name
                    <input
                        // library kehti hai isme register pass krna aur required, bahut available hai
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </label>{" "}
                <label>
                    Email
                    <input
                        {...register("email", {
                            required: "email is required",
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default HookForm;
