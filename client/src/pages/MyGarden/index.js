import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_WATER, REMOVE_PLANT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import PlantCard from "./Components/Card";
import PlantTable from "./Components/Table";
import { Box, Typography } from "@mui/material/";

const MyGarden = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const [addWater, { error }] = useMutation(ADD_WATER);

  const [removePlant, { err }] = useMutation(REMOVE_PLANT);

  const plantData = data?.me.myPlants || [];

  const userData = data?.me || [];

  const handleAddWater = async (plantId) => {
    try {
        await addWater({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlant = async (plantId) => {
    try {
        await removePlant({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const dashboardStyle = {
    width: "100%",
    backgroundColor: "lightBlue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "5px",
    "@media screen and (min-width: 800px)": {
      padding: "10% 15%",
    },
  };

  const plantFeedContainer = {
    width: "95%",
    paddingTop: "5px",
    backgroundColor: "purple",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    "@media screen and (min-width: 800px)": {
      backgroundColor: "black",
    },
    "@media screen and (min-width: 1100px)": {
      backgroundColor: "green",
      justifyContent: "space-around",
    },
  };

  const tableContainer = {
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "navy",
    "@media screen and (min-width: 800px)": {
      padding: "5% 5%",
      backgroundColor: "blue",
    },
  };

  const cardContainer = {
    width: '95%',
    backgroundColor: 'red',
    marginTop: '5px',
    "@media screen and (min-width: 800px)": {
        padding: "5%",
        backgroundColor: "black",
        marginHorizontal: "5px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "45%"
      }
}

return (
    <div className="garden-container">
      <br></br>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 2,
          m: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          style={{
            textAlign: "center",
            fontFamily: "Oswald, sans-serif",
            color: "#EBDBAE",
          }}
        >
          Hello {userData.me?.username}, welcome to your garden
        </Typography>
      </Box>
      <div style={dashboardStyle}>
        <div style={plantFeedContainer} id="plant-feed">
          {/* Elements for the first column */}
          {/* Placeholder for the card with a small image */}
          {plantData?.map((plant) => (
            <>
              {/* key={plant._id} */}
              <div key={plant._id} style={cardContainer}>
              <PlantCard plant={plant} />
              </div>
            </>
          ))}
        </div>
        <div style={tableContainer} id="plant-table">
          <PlantTable plantData={plantData} handleAddWater={handleAddWater} />
        </div>
      </div></div>)


};

export default MyGarden