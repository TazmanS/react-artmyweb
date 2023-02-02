import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Input, MenuItem, Select } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiEditUser, apiGetUser } from "../../api/requests";
import { GlobalContext } from "../../App";

const User = (props) => {
  const {} = props;
  const [searchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
    id: "",
  });
  const navigate = useNavigate();
  const { setSnackbarParams } = useContext(GlobalContext);

  const getUser = async (id) => {
    try {
      const res = await apiGetUser(id);
      setUserInfo(res.data.data);
    } catch (e) {
      navigate("/");
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      getUser(id);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  const handleEdituser = async () => {
    if (!userInfo.name.trim() || !userInfo.email.trim()) {
      setSnackbarParams({ isOpen: true, message: "Fill all inputs" });
      return;
    }

    try {
      await apiEditUser(userInfo.id, userInfo);
      setSnackbarParams({ isOpen: true, message: "You changed user info" });
      navigate("/");
    } catch (e) {
      setSnackbarParams({ isOpen: true, message: "Something went wrong" });
    }
  };

  return (
    <Grid
      container
      mt={10}
      p={4}
      gap={5}
      alignItems="center"
      direction="column"
    >
      <Input
        value={userInfo.name}
        placeholder={"User name"}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <Input
        value={userInfo.email}
        placeholder={"User email"}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        type="email"
      />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={userInfo.gender}
        label="Gender"
        onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
      >
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
      </Select>

      <Select
        labelId="demo-simple-select-label1"
        id="demo-simple-select1"
        value={userInfo.status}
        label="Status"
        onChange={(e) => setUserInfo({ ...userInfo, status: e.target.value })}
      >
        <MenuItem value={"active"}>Active</MenuItem>
        <MenuItem value={"inactive"}>Inactive</MenuItem>
      </Select>

      <Button onClick={handleEdituser}>Save</Button>
    </Grid>
  );
};

export default User;
