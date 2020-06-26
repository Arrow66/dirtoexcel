#!/usr/bin/env node
const path = require('path');
const dirTree = require('directory-tree');
const Excel = require('exceljs')



let getCurrentDirectoryBase =  () => {
    console.log("cwd",process.cwd())
    return process.cwd()
  }


let getDirTree = (filePath)=>{ return dirTree(filePath,{ extensions: /\.js/ })}


let workbook = new Excel.Workbook()
let worksheet = workbook.addWorksheet('Status Report')
worksheet.columns = [{header:"File",key:"file"},{header:"status",key:"status"}]
worksheet.getRow(1).font = {bold: true}
let filePathFromCwd = getCurrentDirectoryBase()
// console.log("SAd",filePathFromCwd)
let fileTree = getDirTree(filePathFromCwd);
// console.log("fileTree",fileTree);


const recursiveTravers = (fch)=>{

    console.log("Writing to excel .....",fch)
    if(fch.type == "directory")
    {
        fch.children.map((fchmap)=>{
            recursiveTravers(fchmap)
        })
    }else
    {
        worksheet.addRow({file:path.relative(process.cwd(),fch.path),status:""})
    }


}


fileTree.children.map((f,i)=>{
  recursiveTravers(f)
})

workbook.xlsx.writeFile('statusReport.xlsx')
