import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Buttons from "./Buttons";


const ExcelDownloader = ({ data, fileName, sheetName }) => {
    const downloadExcel = () => {
        if (!data || data.length === 0) {
            alert("다운로드할 데이터가 없습니다")
            return;
        }

        // 1. JSON 데이터 -> 엑셀 워크시트로 변환
        const worksheet = XLSX.utils.json_to_sheet(data);
        // 2. 엑셀파일 생성 후 워크시트 추가
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || "Sheet1");
        // 3. 엑셀파일 -> Blob으로 변환
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        //4. 파일 다운로드
        saveAs(excelBlob, `${fileName || "data"}.xlsx`);
    };

    return (
        <Buttons className="primary small" onClick={downloadExcel}>
            다운로드
        </Buttons>
    );
};

export default ExcelDownloader