import { useState } from "react";
import { isValidEmail } from "~/functions/emailValidation";

const EmailInput = ({
  onValidation
}: {
  onValidation: (isValid: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const isValid = isValidEmail(newEmail);
    setError(isValid ? null : "Invalid email format");

    // Notify parent form about validation status
    onValidation(isValid);
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EmailInput;
