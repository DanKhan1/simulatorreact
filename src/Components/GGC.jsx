// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   styled,
// } from "@mui/material";

// // Styled components
// const StyledTableCell = styled(TableCell)(() => ({
//   "&.MuiTableCell-head": {
//     backgroundColor: "#1565c0",
//     color: "white",
//   },
//   "&.MuiTableCell-body": {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(() => ({
//   "&:hover": {
//     backgroundColor: "#1565c0",
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// // Helper functions
// function factorial(n) {
//   if (n === 0) return 1;
//   if (n > 0) return n * factorial(n - 1);
// }

// function calculatePo(c, Utilization_time) {
//   let res = 0;
//   for (let n = 0; n < c; n++) {
//     res += Math.pow(c * Utilization_time, n) / factorial(n);
//   }
//   return 1 / (res + Math.pow(c * Utilization_time, c) / (factorial(c) * (1 - Utilization_time)));
// }

// function calculateGGC(meanArrival, meanService, ArrivalVariance, ServiceVariance, servers) {
//   meanArrival = 1 / +meanArrival;
//   meanService = 1 / +meanService;
//   const ca = +ArrivalVariance / Math.pow(1 / meanArrival, 2);
//   const cs = +ServiceVariance / Math.pow(1 / meanService, 2);
//   const Utilization_time = meanArrival / (servers * meanService);
//   const Free_time = +(1 - Utilization_time).toFixed(2);

//   if (Utilization_time < 1) {
//     const expaverageQueueLengthQueue =
//       (calculatePo(servers, Utilization_time) * Math.pow(meanArrival / meanService, servers) * Utilization_time) /
//       (factorial(servers) * Math.pow(1 - Utilization_time, 2));

//     const Length_in_Queue = +(expaverageQueueLengthQueue * ((ca + cs) / 2)).toFixed(2);
//     const Wait_in_Queue = +(Length_in_Queue / meanArrival).toFixed(2);
//     const Wait_in_System = +(Wait_in_Queue + 1 / meanService).toFixed(2);
//     const Length_in_System = +(meanArrival * Wait_in_System).toFixed(2);

//     return {
//       Utilization_time,
//       Free_time,
//       Wait_in_Queue,
//       Length_in_Queue,
//       Wait_in_System,
//       Length_in_System,
//     };
//   } else {
//     return null;
//   }
// }

// // Main component
// const QueueGGC = () => {
//   const [formData, setFormData] = useState({});
//   const [data, setData] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { ArrivalMean, ServiceMean, ArrivalVariance, ServiceVariance, Servers } = formData;

//     // Error handling for missing or invalid inputs
//     if (
//       !ArrivalMean ||
//       !ServiceMean ||
//       !ArrivalVariance ||
//       !ServiceVariance ||
//       !Servers ||
//       ArrivalMean <= 0 ||
//       ServiceMean <= 0 ||
//       ArrivalVariance < 0 ||
//       ServiceVariance < 0 ||
//       Servers <= 0
//     ) {
//       alert("Please enter valid positive numbers in all fields.");
//       return;
//     }

//     // Calculate G/G/c model
//     const model = calculateGGC(ArrivalMean, ServiceMean, ArrivalVariance, ServiceVariance, Servers);

//     if (!model) {
//       alert("Utilization time exceeds 1. The system is unstable.");
//       return;
//     }

//     setData(model);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">G/G/c Queuing Model Simulator</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Arrival Mean (Rate)</label>
//             <input
//               name="ArrivalMean"
//               type="number"
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter arrival rate (e.g., 5)"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Service Mean (Rate)</label>
//             <input
//               name="ServiceMean"
//               type="number"
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter service rate (e.g., 6)"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Arrival Variance</label>
//             <input
//               name="ArrivalVariance"
//               type="number"
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter arrival variance (e.g., 0.5)"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Service Variance</label>
//             <input
//               name="ServiceVariance"
//               type="number"
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter service variance (e.g., 0.5)"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Number of Servers</label>
//             <input
//               name="Servers"
//               type="number"
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Enter number of servers (e.g., 3)"
//             />
//           </div>

//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Submit
//           </Button>
//         </form>

//         {data && (
//           <TableContainer component={Paper} className="mt-6">
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>Metric</StyledTableCell>
//                   <StyledTableCell>Value</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {Object.entries(data).map(([key, value]) => (
//                   <StyledTableRow key={key}>
//                     <StyledTableCell>{key}</StyledTableCell>
//                     <StyledTableCell>{value}</StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QueueGGC;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { InputAdornment, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

function factorial(n) { 
  if (n === 0) {
      return 1;
  }
  if (n > 0) {
      return n * factorial(n - 1);
  }
}

const calculateCaSquare = (arrivalVar, lambda) => {
  return +(Math.round(arrivalVar / Math.pow((1 / lambda), 2)).toFixed(2));
};

const calculateCsSquare = (serviceVar, mue) => {
  return +((serviceVar / Math.pow((1 / mue), 2)).toFixed(2));
};

function calculatePo(c, rho) {
  let res = 0;
  for (let n = 0; n < c; n++) {
    res += Math.pow((c * rho), n) / factorial(n);
  }
  return 1 / (res + (Math.pow((c * rho), c) / (factorial(c) * (1 - rho))));
}

function calculateGGC(meanArrival, meanService, ArrivalVariance, ServiceVariance, servers) {
  meanArrival = 1 / +meanArrival;
  meanService = 1 / +meanService;
  const ca = +ArrivalVariance / (Math.pow(1 / meanArrival, 2));
  const cs = +ServiceVariance / (Math.pow(1 / meanService, 2));
  const rho = (meanArrival / (servers * meanService));
  const idle = +(1 - rho).toFixed(2); 
  if (rho < 1) {
    const expaverageQueueLengthQueue = (calculatePo(servers, rho) * Math.pow((meanArrival / meanService), servers) * rho) / (factorial(servers) * Math.pow(1 - rho, 2));

    const Lq = +(expaverageQueueLengthQueue * ((ca + cs) / 2)).toFixed(2);
    const Wq = +(Lq / meanArrival).toFixed(2);
    const Ws = +(Wq + (1 / meanService)).toFixed(2);
    const Ls = +(meanArrival * Ws).toFixed(2);
    return {
      rho,
      idle,
      Wq,
      Lq,
      Ws,
      Ls
    };
  } else {
    return { rho };
  }
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1E3A8A",  // Blue background color
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: "#3B82F6",  // Light blue on hover
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const QueueGGC = () => {
  const [formdata, setFormData] = useState({});
  const [data, setData] = useState({});

  const handleSubmit = (field, val) => {
    setFormData({ ...formdata, [field]: val });
  };

  const Submit = (e) => {
    e.preventDefault();
    const { ArrivalTime, ServiceTime, ArrivalVariance, ServiceVariance, Servers } = formdata;
    const model = calculateGGC(ArrivalTime, ServiceTime, ArrivalVariance, ServiceVariance, Servers);
    setData({ ...model });
  };

  return (
    <div className='w-full h-screen bg-blue-50'>
      <div className='flex flex-col justify-center items-center'>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="w-full flex flex-col items-center py-5 px-6"
        >
          <TextField
            label="Arrival Mean"
            variant="filled"
            onChange={(e) => handleSubmit("ArrivalTime", e.target.value)}
            sx={{
              marginX: { md: "1vw", xs: '4vw' },
              width: { xs: "90%", md: '15%' },
              marginY: { md: "1vw", xs: '4vw' },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "end",
                      opacity: 0,
                      pointerEvents: "none",
                      width: "fit-content",
                    }}
                  >
                    minute
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Service Mean"
            sx={{
              marginX: { md: "1vw", xs: '4vw' },
              width: { xs: "90%", md: '15%' },
              marginY: { md: "1vw", xs: '4vw' },
            }}
            variant="filled"
            onChange={(e) => handleSubmit("ServiceTime", e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "end",
                      opacity: 0,
                      pointerEvents: "none",
                      width: "fit-content",
                    }}
                  >
                    minute
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Arrival Variance"
            sx={{
              marginX: { md: "1vw", xs: '4vw' },
              width: { xs: "90%", md: '15%' },
              marginY: { md: "1vw", xs: '4vw' },
            }}
            variant="filled"
            onChange={(e) => handleSubmit("ArrivalVariance", e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "end",
                      opacity: 0,
                      pointerEvents: "none",
                      width: "fit-content",
                    }}
                  >
                    minute
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Service Variance"
            variant="filled"
            onChange={(e) => handleSubmit("ServiceVariance", e.target.value)}
            sx={{
              marginX: { md: "1vw", xs: '4vw' },
              width: { xs: "90%", md: '15%' },
              marginY: { md: "1vw", xs: '4vw' },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "end",
                      opacity: 0,
                      pointerEvents: "none",
                      width: "fit-content",
                    }}
                  >
                    minute
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Number of Server"
            variant="filled"
            sx={{
              marginX: { md: "1vw", xs: '4vw' },
              width: { xs: "90%", md: '15%' },
              marginY: { md: "1vw", xs: '4vw' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "end",
                    opacity: 0,
                    pointerEvents: "none",
                    width: "fit-content",
                  }}
                >
                  Number
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleSubmit("Servers", e.target.value)}
          />
          <button
            className='md:w-[10vw] w-[92%] md:h-[4.4vw] py-4 px-2 md:ml-7 mx-[2vw] my-[1vw] rounded-md bg-blue-800 text-white active:scale-95 hover:bg-blue-600 text-md'
            onClick={Submit}
          >
            Calculate
          </button>
        </Box>
      </div>

      <Box className="px-3 py-[10vw]">  
        {
          (Object.keys(data).length === 0) ? null :
            (Object.keys(data).length === 1) ?
              <div className='flex items-center justify-center'>
                <div className='border-1 border p-2 rounded-lg border-blue-300'>
                  <h1 className='text-center font-mono font-bold text-xl text-blue-950'>{`Rho (${data.rho}) is greater than 1. It's not a model.`}</h1>
                </div>
              </div> :
              <>
                <TableContainer component={Paper} sx={{ maxWidth: '1200px', margin: 'auto' }}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align='center'>Utilization</StyledTableCell>
                        <StyledTableCell align='center'>Wait Time In Queue(Wq)</StyledTableCell>
                        <StyledTableCell align='center'>Wait Time In System(Ws)</StyledTableCell>
                        <StyledTableCell align='center'>Length In Queue(Lq)</StyledTableCell> 
                        <StyledTableCell align='center'>Length In System(Ls)</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data ?
                        <StyledTableRow className='px-15'>
                          <StyledTableCell className='mx-15' align='center'>{data.rho}</StyledTableCell>
                          <StyledTableCell className='mx-15' align='center'>{data.Wq}</StyledTableCell>
                          <StyledTableCell className='mx-5' align='center'>{data.Ws}</StyledTableCell>
                          <StyledTableCell className='mx-5' align='center'>{data.Lq}</StyledTableCell>
                          <StyledTableCell className='mx-5' align='center'>{data.Ls}</StyledTableCell>
                        </StyledTableRow>
                        :
                        <h1>This is not a queuing model.</h1>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
        }
      </Box>
    </div>
  );
};

export default QueueGGC;
