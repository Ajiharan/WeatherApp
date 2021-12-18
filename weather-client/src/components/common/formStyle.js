import styled from "styled-components";
const FormContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 0.5rem;
  form {
    width: 80%;
  }
  .form-footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .log-account {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.3rem;
    p {
      margin-bottom: 0.2rem;
    }
  }
  p {
    margin-bottom: 0.5rem;
  }
`;

export default FormContainer;
