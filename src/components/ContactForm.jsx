import{ useState } from 'react';
import { FaEnvelope } from "react-icons/fa";
import { PropTypes } from "prop-types";

const ContactForm = (props) => {

  const [formData, setFormData] = useState({
    name: '', 
    subject: '', 
    message: ''
  });

  const [errors, setErrors] = useState({}); 
  const [isSubmitted, setIsSubmitted] = useState(false); 

  // Function called whenever a form field is changed
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value of the changed field
    setFormData({ ...formData, [name]: value }); // Update the form data state with the new value

    // Reset the error message for the field that was changed
    setErrors({ ...errors, [name]: '' });
  };

  // Function to validate the form fields
  const validate = () => {
    let newErrors = {}; 
    const validName = /^[a-zA-Z\s]+$/; // Regex to validate that the name contains only letters and spaces
    const validSubject = /^[a-zA-Z\s]+$/;

    if (!validName.test(formData.name)) {
      newErrors.name = 'Nom invalide, utilisez uniquement des lettres et des espaces.';
    }

    if (!validSubject.test(formData.subject)) {
      newErrors.subject = 'Sujet non valide, utilisez uniquement des lettres et des espaces.';
    }

    if (formData.message.trim() === '') {
      newErrors.message = 'Le message ne peut pas être vide.';
    }

    setErrors(newErrors); // Update the state with the new error messages

    // If there are no errors, return true; otherwise, return false
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">
        <h2>Contactez-nous</h2> 
        <FaEnvelope className="icon-contact" />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ borderColor: errors.name ? 'red' : isSubmitted ? 'green' : '' }} 
            required
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{ borderColor: errors.subject ? 'red' : isSubmitted ? 'green' : '' }}
            required
          />
          {errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}
        </div>

        <div>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            style={{ borderColor: errors.message ? 'red' : isSubmitted ? 'green' : '' }}
            required
          />
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </div>

        <button type="submit">Envoyer</button>
      </form>

      {isSubmitted && <p style={{ color: 'green', marginTop: '20px' }}>Email envoyé avec succès à { props.email }</p>}
    </div>
  );
}

ContactForm.propTypes = {
    email: PropTypes.any.isRequired
};

export default ContactForm;

