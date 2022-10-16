import React from 'react'
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import  axios  from 'axios';
import { HistoricalChart } from '../config/api';
import { useEffect } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import {Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js';
Chart.register (LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);




const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

function CoinInfo({coin}) {
   const[historicalData , setHistoricalData] = useState()
   const [days , setDays] = useState(1);
   const {currency} = CryptoState();
   const classes = useStyles();
   const fetchhistoricalData = async () => {
       const {data} = await axios.get(HistoricalChart(coin.id,days, currency ))

       setHistoricalData(data.prices)
   };


 
   console.log(historicalData ,9);
   useEffect(()=> {
    fetchhistoricalData()
   },[currency , days]);
   const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
         {
           !historicalData? (
             <CircularProgress
             style={{color : "gold"}}
             size={250}
             thickness={1}
             />
           ) : (

            <>

            <Line
            
            data={{
              labels: historicalData.map((coin) =>{
                 let date = new Date(coin[0]);
                 let time =
                 date.getHours() > 12 
                 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                 : `${date.getHours()}:${date.getMinutes()} AM`;
                 return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
            />
            
            </>
           )
         }
         
          </div>
          </ThemeProvider>
  )
}

export default CoinInfo