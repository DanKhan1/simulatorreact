import React, { useState } from 'react';

const MMC = () => {
  const [lambda, setLambda] = useState(); // Arrival rate
  const [mu, setMu] = useState(); // Service rate
  const [servers, setServers] = useState(); // Number of servers
  const [results, setResults] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

  const calculatePo = (c, rho) => {
    let res = 0;
    for (let n = 0; n < c; n++) {
      res += Math.pow(c * rho, n) / factorial(n);
    }
    return 1 / (res + Math.pow(c * rho, c) / (factorial(c) * (1 - rho)));
  };

  const calculateMetrics = () => {
    const arrivalRate = 1 / parseFloat(lambda);
    const serviceRate = 1 / parseFloat(mu);
    const c = parseInt(servers, 10);

    if (arrivalRate <= 0 || serviceRate <= 0 || c <= 0) {
      alert('Please enter positive values for arrival rate, service rate, and number of servers.');
      return;
    }

    const rho = Number((arrivalRate / (c * serviceRate)).toFixed(2)); // Utilization

    if (rho >= 1) {
      alert(`Rho (${rho}) is greater than or equal to 1. The system is not stable.`);
      return;
    }

    const Po = calculatePo(c, rho);

    const Lq = Number(
      ((Po * Math.pow(arrivalRate / serviceRate, c) * rho) / (factorial(c) * Math.pow(1 - rho, 2))).toFixed(1)
    );

    const L = Number((Lq + arrivalRate / serviceRate).toFixed(1));
    const Wq = Number((Lq / arrivalRate).toFixed(2));
    const W = Number((Wq + 1 / serviceRate).toFixed(2));

    setResults({
      rho,
      Lq,
      L,
      Wq,
      W,
      idle: Number((1 - rho).toFixed(2)),
    });
    setShowForm(false);
  };

  return (
    <>
      <div className="p-8 max-w-lg mx-auto bg-gray-100 shadow-md rounded">
        {showForm && (
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label
                htmlFor="arrivalRate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Arrival Rate (λ):
              </label>
              <input
                type="number"
                id="arrivalRate"
                value={lambda}
                onChange={(e) => setLambda(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter arrival rate"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="serviceRate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Service Rate (μ):
              </label>
              <input
                type="number"
                id="serviceRate"
                value={mu}
                onChange={(e) => setMu(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter service rate"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="numberOfServers"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Number of Servers (C):
              </label>
              <input
                type="number"
                id="numberOfServers"
                value={servers}
                onChange={(e) => setServers(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter number of servers"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={calculateMetrics}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Calculate
              </button>
            </div>
          </form>
        )}

        {!showForm && results && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Simulation Results:</h2>
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1565c0] text-white">
                  <th className="border px-4 py-2">Utilization (ρ)</th>
                  <th className="border px-4 py-2">Average Queue Length (Lq)</th>
                  <th className="border px-4 py-2">Average Number in System (L)</th>
                  <th className="border px-4 py-2">Average Waiting Time in Queue (Wq)</th>
                  <th className="border px-4 py-2">Average Time in System (W)</th>
                  <th className="border px-4 py-2">Idle Probability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">{results.rho}</td>
                  <td className="border px-4 py-2">{results.Lq}</td>
                  <td className="border px-4 py-2">{results.L}</td>
                  <td className="border px-4 py-2">{results.Wq}</td>
                  <td className="border px-4 py-2">{results.W}</td>
                  <td className="border px-4 py-2">{results.idle}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 font-bold">Server Utilization: {results.rho * 100}%</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back to Form
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MMC;


// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// const MMC = () => {
//   const [lambda, setLambda] = useState(); // Arrival rate
//   const [mu, setMu] = useState(); // Service rate
//   const [servers, setServers] = useState(); // Number of servers
//   const [results, setResults] = useState(null);
//   const [showForm, setShowForm] = useState(true);

//   const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

//   const calculateMetrics = () => {
//     const arrivalRate = 1 / parseFloat(lambda);
//     const serviceRate = 1 / parseFloat(mu);
//     const c = parseInt(servers, 10);

//     if (arrivalRate <= 0 || serviceRate <= 0 || c <= 0) {
//       alert("Please enter positive values for arrival rate, service rate, and number of servers.");
//       return;
//     }

//     const rho = arrivalRate / (c * serviceRate); // Utilization per server
//     if (rho > 1) {
//       alert("System is unstable (rho >= 1). Increase the number of servers or adjust rates.");
//       return;
//     }

//     let P0 = 0;
//     for (let n = 0; n < c; n++) {
//       P0 += Math.pow(arrivalRate / serviceRate, n) / factorial(n);
//     }
//     P0 += (Math.pow(arrivalRate / serviceRate, c) / (factorial(c) * (1 - rho)));
//     P0 = 1 / P0;

//     const Lq = (P0 * Math.pow(arrivalRate / serviceRate, c) * rho) / (factorial(c) * Math.pow(1 - rho, 2));
//     const L = Lq + arrivalRate / serviceRate;
//     const Wq = Number(Math.round((Lq / arrivalRate).toFixed(1)));
//     const W = Wq + 1 / serviceRate;

//     setResults({
//       rho: Number(rho.toFixed(1)),
//       Lq: Number(Lq.toFixed(1)),
//       L: Number(L.toFixed(1)),
//       Wq: Wq,
//       W: Number(W.toFixed(1)),
//     });
//     setShowForm(false);
//   };

//   return (
//     <>
//       <div className="p-8 max-w-lg mx-auto bg-gray-100 shadow-md rounded">
//         {showForm && (
//           <form className="w-full max-w-sm">
//             <div className="mb-4">
//               <label htmlFor="arrivalRate" className="block text-gray-700 text-sm font-bold mb-2">
//                 Arrival Rate (λ):
//               </label>
//               <input
//                 type="number"
//                 id="arrivalRate"
//                 value={lambda}
//                 onChange={(e) => setLambda(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter arrival rate"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="serviceRate" className="block text-gray-700 text-sm font-bold mb-2">
//                 Service Rate (μ):
//               </label>
//               <input
//                 type="number"
//                 id="serviceRate"
//                 value={mu}
//                 onChange={(e) => setMu(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter service rate"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="numberOfServers" className="block text-gray-700 text-sm font-bold mb-2">
//                 Number of Servers (C):
//               </label>
//               <input
//                 type="number"
//                 id="numberOfServers"
//                 value={servers}
//                 onChange={(e) => setServers(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter number of servers"
//               />
//             </div>
//             <div className="flex items-center justify-center">
//               <button
//                 type="button"
//                 onClick={calculateMetrics}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Calculate
//               </button>
//             </div>
//           </form>
//         )}

//         {!showForm && results && (
//           <div className="mt-6 bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-bold mb-2">Simulation Results:</h2>

//             <BarChart width={600} height={300} data={[
//               { name: 'Utilization (ρ)', value: results.rho },
//               { name: 'Queue Length (Lq)', value: results.Lq },
//               { name: 'System Length (L)', value: results.L },
//               { name: 'Waiting Time (Wq)', value: results.Wq },
//               { name: 'Time in System (W)', value: results.W },
//             ]}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#1565c0" />
//             </BarChart>

//             <p className="mt-4 font-bold">Server Utilization: {results.rho * 100}%</p>
//             <button
//               onClick={() => setShowForm(true)}
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Back to Form
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MMC;
