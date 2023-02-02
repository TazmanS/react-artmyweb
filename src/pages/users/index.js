import React, { useEffect, useState } from "react";
import UsersList from "./UsersList";
import { Grid } from "@mui/material";
import { apiGetUsers } from "../../api/requests";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    gender: ["male", "female"],
  });
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await apiGetUsers(page, filters);
      setUsers(res.data.data);
      setPagination(res.data.meta.pagination);

      if (page > res.data.meta.pagination.pages) {
        setPage(1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers(page, filters);
  }, [page, filters]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChoseUser = (id) => {
    navigate(`/edit?id=${id}`, { state: id });
  };

  return (
    <Grid container mt={10} p={4} gap={5}>
      <Filters filters={filters} setFilters={setFilters} />
      <UsersList users={users} rowClick={handleChoseUser} />
      <Pagination
        count={pagination.pages}
        page={page}
        onChange={handleChangePage}
      />
    </Grid>
  );
};

export default Users;
