import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Table from "react-bootstrap/Table";
import { useContext, useState } from "react";
import { EmployerPostContext } from "../contexts/EmployerPostContext";

const CVSubmitModal = () => {
  const { showCVSubmitModal, setShowCVSubmitModal } =
    useContext(EmployerPostContext);
  let i = 0;
  function formatDateToDDMMYYYY (input){
    const date = new Date(input)
    return (date.getDate()) + "/" + (date.getMonth() + 1) + "/" +(date.getFullYear())
  }
  return (
    <Modal
      show={showCVSubmitModal.show}
      onHide={() => {
        setShowCVSubmitModal({ show: false, listCV: [] });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>List Submitted CV</Modal.Title>
      </Modal.Header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Url</th>
            <th>Match</th>
          </tr>
        </thead>
        <tbody>
          {showCVSubmitModal.listCV.map((cv) => {
            i++;
            
            return (
              <>
                <tr>
                  <td>{i}</td>
                  <td>{formatDateToDDMMYYYY(cv.date)}</td>
                  <td><a href={cv.url} target="_blank">View CV</a></td>
                  <td>{cv.matchPercent}%</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </Modal>
  );
};

export default CVSubmitModal;
