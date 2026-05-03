import { useState } from "react";

const ManualForm = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        role: "Frontend",
        experience: "",
        cover: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function set(field) {
        return (e) => setValues((v) => ({ ...v, [field]: e.target.value })); // e is event here
    }

    function validate(v) {
        const e = {};
        if (!v.name.trim()) e.name = "Name is required";
        if (!v.email.trim()) e.email = "Email is Required";
        return e;
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        const e = validate(values);
        setErrors(e);

        if (Object.keys(e).length === 0) setSubmitted(true);
    }

    if (submitted) {
        return (
            <div>
                <h1>Form Submitted Successfully {values.name}.</h1>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>
                <label>
                    Full Name
                    <input value={values.name} onChange={set("name")} />
                    {errors.name && <span> {errors.name}</span>}
                </label>

                <label>
                    Email
                    <input value={values.email} onChange={set("email")} />
                    {errors.email && <span> {errors.email}</span>}
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ManualForm;
