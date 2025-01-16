// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   InputAdornment,
//   Box,
//   styled,
// } from "@mui/material";

// // Styled Components
// const StyledTableCell = styled(TableCell)(() => ({
//   ["&.MuiTableCell-head"]: {
//     backgroundColor: "#065F46",
//     color: "white",
//   },
//   ["&.MuiTableCell-body"]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(() => ({
//   "&:hover": {
//     backgroundColor: "#065F46",
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// // Factorial Function
// const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

// // Calculate Po
// function calculatePo(c, rho) {
//   let res = 0;
//   for (let n = 0; n < c; n++) {
//     res += Math.pow(c * rho, n) / factorial(n);
//   }
//   return 1 / (res + Math.pow(c * rho, c) / (factorial(c) * (1 - rho)));
// }

// // Calculate Cs^2
// const calculateCsSquare = (variance, mue) => variance / Math.pow(1 / mue, 2);

// // Main Calculation Function
// const calculateMGC = (meanArrivalTime, minServiceTime, maxServiceTime, servers) => {
//   meanArrivalTime = parseFloat(1 / meanArrivalTime);
//   const meanServiceTime = 1 / ((+minServiceTime + +maxServiceTime) / 2);
//   servers = parseInt(servers);

//   const rho = +(meanArrivalTime / (servers * meanServiceTime)).toFixed(2);
//   if (rho >= 1) {
//     return { rho };
//   }

//   const idle = +(1 - rho).toFixed(2);
//   const variance = Math.pow(maxServiceTime - minServiceTime, 2) / 12;
//   const cs2 = calculateCsSquare(variance, meanServiceTime);
//   const Lq = +(
//     ((calculatePo(servers, rho) * Math.pow(meanArrivalTime / meanServiceTime, servers) * rho) /
//       (factorial(servers) * Math.pow(1 - rho, 2))) *
//     ((cs2 + 1) / 2)
//   ).toFixed(2);
//   const Wq = +(Lq / meanArrivalTime).toFixed(2);
//   const Ws = +(Wq + 1 / meanServiceTime).toFixed(2);
//   const Ls = +(meanArrivalTime * Ws).toFixed(2);

//   return {
//     rho,
//     idle,
//     Wq,
//     Lq,
//     Ws,
//     Ls,
//   };
// };

// // Main Component
// const MGC = () => {
//   const [formData, setFormData] = useState({});
//   const [results, setResults] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleCalculate = (e) => {
//     e.preventDefault();
//     const { ArrivalTime, MinServiceTime, MaxServiceTime, Servers } = formData;

//     if (!ArrivalTime || !MinServiceTime || !MaxServiceTime || !Servers) {
//       alert("Please fill in all fields with valid values.");
//       return;
//     }

//     const results = calculateMGC(ArrivalTime, MinServiceTime, MaxServiceTime, Servers);
//     setResults(results);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">M/G/C Queue Simulator</h1>
//         <form onSubmit={handleCalculate}>
//           <TextField
//             label="Arrival Time"
//             name="ArrivalTime"
//             variant="filled"
//             fullWidth
//             margin="normal"
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Min Service Time"
//             name="MinServiceTime"
//             variant="filled"
//             fullWidth
//             margin="normal"
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Max Service Time"
//             name="MaxServiceTime"
//             variant="filled"
//             fullWidth
//             margin="normal"
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Number of Servers"
//             name="Servers"
//             variant="filled"
//             fullWidth
//             margin="normal"
//             onChange={handleInputChange}
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             Calculate
//           </button>
//         </form>

//         {results && (
//           <TableContainer component={Paper} className="mt-6">
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell>Metric</StyledTableCell>
//                   <StyledTableCell>Value</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {Object.entries(results).map(([key, value]) => (
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

// export default MGC;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Box,
  styled,
} from "@mui/material";

// Styled Components
const StyledTableCell = styled(TableCell)(() => ({
  ["&.MuiTableCell-head"]: {
    backgroundColor: "#0000FF",
    color: "white",
  },
  ["&.MuiTableCell-body"]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#0000FF",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Factorial Function
const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

// Calculate Po
function calculatePo(c, rho) {
  let res = 0;
  for (let n = 0; n < c; n++) {
    res += Math.pow(c * rho, n) / factorial(n);
  }
  return 1 / (res + Math.pow(c * rho, c) / (factorial(c) * (1 - rho)));
}

// Calculate Cs^2
const calculateCsSquare = (variance, mue) => variance / Math.pow(1 / mue, 2);

// Main Calculation Function
const calculateMGC = (meanArrivalTime, minServiceTime, maxServiceTime, servers) => {
  meanArrivalTime = parseFloat(1 / meanArrivalTime);
  const meanServiceTime = 1 / ((+minServiceTime + +maxServiceTime) / 2);
  servers = parseInt(servers);

  const rho = +(meanArrivalTime / (servers * meanServiceTime)).toFixed(2);
  if (rho >= 1) {
    return { rho, isValidModel: false, message: `Rho (${rho}) is greater than or equal to 1. It's not a valid model.` };
  }

  const idle = +(1 - rho).toFixed(2);
  const variance = Math.pow(maxServiceTime - minServiceTime, 2) / 12;
  const cs2 = calculateCsSquare(variance, meanServiceTime);
  const Lq = +(
    ((calculatePo(servers, rho) * Math.pow(meanArrivalTime / meanServiceTime, servers) * rho) /
      (factorial(servers) * Math.pow(1 - rho, 2))) *
    ((cs2 + 1) / 2)
  ).toFixed(2);
  const Wq = +(Lq / meanArrivalTime).toFixed(2);
  const Ws = +(Wq + 1 / meanServiceTime).toFixed(2);
  const Ls = +(meanArrivalTime * Ws).toFixed(2);

  return {
    rho,
    idle,
    Wq,
    Lq,
    Ws,
    Ls,
    isValidModel: true,
    message: `Rho (${rho}) indicates a valid queuing model.`
  };
};

// Main Component
const MGC = () => {
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const { ArrivalTime, MinServiceTime, MaxServiceTime, Servers } = formData;

    if (!ArrivalTime || !MinServiceTime || !MaxServiceTime || !Servers) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    const results = calculateMGC(ArrivalTime, MinServiceTime, MaxServiceTime, Servers);
    setResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">M/G/C Queue Simulator</h1>
        <form onSubmit={handleCalculate}>
          <TextField
            label="Arrival Time"
            name="ArrivalTime"
            variant="filled"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Min Service Time"
            name="MinServiceTime"
            variant="filled"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Max Service Time"
            name="MaxServiceTime"
            variant="filled"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Number of Servers"
            name="Servers"
            variant="filled"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Calculate
          </button>
        </form>

        {results && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Simulation Results:</h2>
            <p>{results.message}</p>
            <TableContainer component={Paper} className="mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Metric</StyledTableCell>
                    <StyledTableCell>Value</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(results).map(([key, value]) => (
                    key !== "isValidModel" && key !== "message" && (
                      <StyledTableRow key={key}>
                        <StyledTableCell>{key}</StyledTableCell>
                        <StyledTableCell>{value}</StyledTableCell>
                      </StyledTableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default MGC;

