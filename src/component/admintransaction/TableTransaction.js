import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useLoginContext } from "../loginContext/LoginContext";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import "./Transaction.css";

const TableTransaction = (props) => {
  const { data } = props;

  const { updateDocument } = useLoginContext();

  const handleCancel = async (id) => {
    await updateDocument(id, "Cancel");
  };

  const handleSucces = async (id) => {
    await updateDocument(id, "Success");
  };

  console.log(data);
  return (
    <div>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Addres</th>
            <th>Post Code</th>
            <th>Income</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <td className="title-tab">{index + 1}</td>
              <td className="title-tab">{item.nama}</td>
              <td className="title-tab">{item.addres}</td>
              <td className="title-tab">{item.postcode}</td>
              <td className="income">{item.total}</td>
              <td>
                <span
                  style={{
                    color:
                      item.status === "Cancel"
                        ? "red"
                        : item.status === "Success"
                        ? "#78A85A"
                        : "yellow",
                  }}
                >
                  {item.status}
                </span>
              </td>
              <td className="button-transaction">
                {item.status === "Success" ? (
                  <HiCheckCircle className="icon1 succes-icon" />
                ) : item.status === "Cancel" ? (
                  <HiXCircle className="icon1 cancel-icon" />
                ) : (
                  <>
                    {" "}
                    <button
                      className="cancel"
                      onClick={() => handleCancel(item.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="acc"
                      onClick={() => handleSucces(item.id)}
                    >
                      approve
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableTransaction;
