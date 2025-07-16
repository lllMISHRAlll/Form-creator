import styles from "../../stylesheets/ViewPage.module.css";
import { useState, useEffect } from "react";
import apiCall from "../../utils/API";
import { useParams } from "react-router-dom";

const ViewPage = () => {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getFormDetails = async () => {
    const response = await apiCall(`${BACKEND_URL}/api/forms/${id}`, "GET");
    setForm(response);
  };

  useEffect(() => {
    getFormDetails();
  }, []);

  const handleSubmit = () => {
    alert("Form Submitted");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{form.title}</h1>
      <div className={styles.formLayout}>
        {form?.fields?.map((field, index) => {
          return (
            <div className={styles.form} key={index}>
              {field.sectionTitle && <h4>{field.sectionTitle}</h4>}
              <label htmlFor="">{field.title}</label>
              <br />
              <input
                type={field.type}
                placeholder={field.placeholder}
                className={styles.input}
              />
            </div>
          );
        })}
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default ViewPage;
