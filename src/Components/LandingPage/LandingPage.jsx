import styles from "../../stylesheets/LandingPage.module.css";
import { useState, useEffect } from "react";
import apiCall from "../../utils/API";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [forms, setForms] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const getHomeDetails = async () => {
    const response = await apiCall(`${BACKEND_URL}/api/forms/`, "GET");
    setForms(response);
  };

  const handleView = (formId) => {
    navigate(`/view/${formId}`);
  };

  const handleEditForm = (formId) => {
    navigate(`/edit/${formId}`);
  };

  const handleCreateForm = () => {
    navigate("/create");
  };

  const handleDeleteForm = async (formId) => {
    const response = await apiCall(
      `${BACKEND_URL}/api/forms/delete/${formId}`,
      "GET"
    );
    window.location.reload();
  };

  useEffect(() => {
    getHomeDetails();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeContainer}>
        <h1>Welcome to Form.com</h1>
        <h3>This is a simple form Builder</h3>
        <button className={styles.button} onClick={handleCreateForm}>
          CREATE NEW FORM
        </button>
      </div>
      <div className={styles.formsContainer}>
        <h1>Forms</h1>
        <div className={styles.forms}>
          {forms.map((form) => (
            <div key={form.formId} className={styles.formCard}>
              <h3>{form.title}</h3>
              <div className={styles.buttonContainer}>
                <div
                  onClick={() => handleView(form.formId)}
                  className={styles.viewButton}
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=10424&format=png&color=000000"
                    alt="view-img"
                  />
                </div>
                <div
                  onClick={() => handleEditForm(form.formId)}
                  className={styles.editButton}
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=20388&format=png&color=000000"
                    alt="edit-img"
                  />
                </div>
                <div
                  onClick={() => handleDeleteForm(form.formId)}
                  className={styles.deleteButton}
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=8329&format=png&color=000000"
                    alt="delete-img"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
