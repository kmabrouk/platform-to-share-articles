import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, listUsers } from "../../actions/userActions";

function Users({ history, search }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [usersListAll, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await listUsers(userInfo.token);
      if (!userInfo) {
        history.push("/");
      } else setUsers(data);
    }
    getData();
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUserAction(id));
    }
  };

  return (
    <MainScreen title={`List of users :`}>
      {
        <div className="mt-5">
          <div className="container">
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                  <th scope="col"> Show detail</th>
                  <th scope="col"> Delete user</th>
                </tr>
              </thead>
              <tbody>
                {usersListAll.map((element, id) => {
                  return element._id !== userInfo._id ? (
                    <>
                      <tr>
                        <th scope="row">{id}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>
                          <NavLink to={`./showprofile/${element._id}`}>
                            {" "}
                            <button className="btn">
                              <RemoveRedEyeIcon />
                            </button>
                          </NavLink>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() => deleteHandler(element._id)}
                          >
                            <DeleteOutlineIcon />
                          </button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      }
    </MainScreen>
  );
}

export default Users;
