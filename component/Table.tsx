'use client'
import React, { useState } from "react";
import * as XLSX from "xlsx";


const Table = () => {

    const [file, setFile] = useState<File|null>(null)
    const [jsonData, setJsonData] = useState("")
    const [sheetData, setSheetData] = useState({});

    const previewData = () => {
        if (file){
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = e.target?.result
                var mySheetData = {};
                if (data){
                    const workbook = XLSX.read(data, { type: "binary" })
                    for(var i = 0; i < workbook.SheetNames.length; i++){
                        let sheetName = workbook.SheetNames[i];

                        const workSheet = workbook.Sheets[sheetName]
                        const json = XLSX.utils.sheet_to_json(workSheet)

                        mySheetData[sheetName] = json;
                    }
                    setJsonData(JSON.stringify(mySheetData, null, 2))
                    console.log(jsonData)
                }
            };
            reader.readAsArrayBuffer(file)
        }
    }
    return(
        <div className="py-8 space-y-8">
            <div className="flex items-center gap-8">
                <div>
                    {/*buttons*/}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                    file:hover:bg-gray-500 file:cursor-pointer bg-gray-50 file:text-white focus:outline-none file:bg-gray-700 
                    file:border-gray-600" 
                    id="file_input" 
                    type="file" 
                    accept=".xls,.xlsx"
                    onChange={(e) =>setFile(e.target.files?e.target.files[0] : null)}/>
                </div>
                <button className="py-2 px-6 rounded bg-slate-300 text-slate-900" onClick={previewData}>Preview Data</button>
            </div>

            <pre>{jsonData}</pre>
        </div>
    )
}

export default Table;