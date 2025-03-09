import React from 'react'
import useSWR from 'swr';
import { fetcher } from '../Api/Services';
import printJS from 'print-js';
import  html2pdf from 'html2pdf.js';

const VoucherCard  = ({id}) => {
    const {data, isLoading} = useSWR( `${import.meta.env.VITE_BASE_URL}/vouchers/${id}`, fetcher)

    const handlePdf = () => {
        const element = document.getElementById("printArea");
    
        // Options for PDF generation
        const opt = {
          margin: 0.2,
          filename: "invoice.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a5', orientation: 'portrait' },
        };
    
        html2pdf().from(element).set(opt).save();}

const handlePrint = () => {

    printJS({
      printable: "printArea",
      type: "html",
      //   header: "INVOICE",
      scanStyles: true,
      css: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ],
    });
  };


  return (
    
    <div className=" flex gap-5">
        {isLoading && <p>Loading ... </p>}
    <div id="printArea" className="w-[14.8cm] print:text-sm bg-white ">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
          <p className="text-xl">{data?.voucher_id}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">Invoice to</p>
          <p>{data?.customer_name}</p>
          <p>Date: {data?.sale_date}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left py-2 text-sm">No</th>
            <th className="text-left py-2 text-sm">Description</th>
            <th className="text-right py-2 text-sm">Qty</th>
            <th className="text-right py-2 text-sm">Price</th>
            <th className="text-right py-2 text-sm">Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.records.map((record, index) => (
            <tr key={record.id} className="border-b border-gray-200">
              <td className="py-2 text-sm">{index + 1}</td>
              <td className="py-2 text-sm">{record.product.name}</td>
              <td className="text-right py-2 text-sm">{record.quantity}</td>
              <td className="text-right py-2 text-sm">
                {record.product.price}
              </td>
              <td className="text-right py-2 text-sm">{record.cost}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-b border-gray-200">
            <td className="py-2 text-right text-sm" colSpan={4}>
              Total
            </td>
            <td className="py-2 text-right text-sm">{data?.total.toFixed(2)}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-2 text-right text-sm" colSpan={4}>
              Tax
            </td>
            <td className="py-2 text-right text-sm">{data?.tax.toFixed(2)}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-2 text-right text-sm" colSpan={4}>
              Net Total
            </td>
            <td className="py-2 text-right text-sm">{data?.netTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className=" text-xs mb-8 ">
        <div className=" ">
          <h2 className="font-bold mb-2">Payment Transfer to</h2>
          <p>KPay,Wave - 959857644</p>
          <p>KBZ Bank - 02730102705025601</p>
          <p>AYA Bank - 20003674121</p>
        </div>
        <div className="  ">
          <h2 className="font-bold text-xl">Thu Zin Htet</h2>
          <p>54*55st , 112fst , AungMyaThaZan ,Mandalay</p>
          <p>+959-750-585-353</p>
          <p>ThuZinDevHtet@gmail.com</p>
        </div>
      </div>

      <div className="border-t-2 border-gray-300 pt-4">
        <p className="mt-2 text-center text-sm">Thanks to You</p>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <button
        className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handlePrint}
      >
        Print Voucher
      </button>

      <button
        className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handlePdf}
      >
        Download PDF
      </button>
    </div>
  </div>

  )
}

export default VoucherCard 