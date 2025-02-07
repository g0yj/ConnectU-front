import { useEffect, useState } from "react";
import Buttons from "@/components/Buttons";
import dayjs from "dayjs";
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from "@nivo/line";

export const CompanySummary = ({ company }) => {

  const [filteredContract, setFilteredContract] = useState([]); // 종료된 계약은 보여주지 않기 위함
  const [pie, setPie] = useState({ contractAmount: 0, unpaid: 0});
  const [graph, setGraph] = useState({});

  useEffect(() => {
    if (company && company.contracts) { //  company 또는 company.contracts가 undefined 을 방지
      // 거래 정보
      const today = dayjs().format("YYYY-MM-DD");
      const validContract = company.contracts.filter((f) => {
        return dayjs(f.endDate).isAfter(today) || dayjs(f.endDate).isSame(today, "day");
      });
      setFilteredContract(validContract);
      
      // 총수익과 미수금
      const totalContractAmount = company.contracts.reduce((sum, contract) => {
        if (contract.type === "R") {
          return sum + contract.contractAmount;
        }
        return sum;
      }, 0);
      
      const totalUnpaid = company.contracts.reduce((sum, contract) => {
        if (contract.type === "R"){
          return sum + contract.unpaid;
        }
        return sum;
      }, 0);
      setPie({
        contractAmount: totalContractAmount,
        unpaid: totalUnpaid,
      })

      // 연도별 총수익
      const yearRevenue = {};
      company.contracts.forEach((contract) => {
        const year = dayjs(contract.startDate).year();
        if (contract.type === "R") {
          if (yearRevenue[year]) {
            yearRevenue[year] += contract.contractAmount;
          } else {
            yearRevenue[year] = contract.contractAmount;
          }
        }
      });
        setGraph(yearRevenue);
    }
  
  }, [company]);

  useEffect(() => {
    
  })

  return (
    <div className="ui-contents-inner">
      <div className="ui-location-wrap">
      <div className="ui-location-title">{company.name}</div>
    </div>

    <div className="ui-info-table">
      <table>
        <tbody>
          <tr>
            <th>대표자명</th>
            <td>{company.representative}</td> 
            <th style={{ width: '120px' }}>사업자등록번호</th>
            <td>{company.companyNumber}</td>
          </tr>            
          <tr>
            <th>연락처</th>
            <td>{company.phone}</td>
            <th style={{ width: "60px" }}>이메일</th>
            <td>{company.email}</td>
          </tr>
          <tr>
            <th style={{ height: '100px' }} >특이사항</th>
            <td colSpan={3} style={{ height: '100px' }}>{company.note }</td>
          </tr>
        </tbody>
      </table>
    </div>
          
    <div className="ui-list-table sp-mt-10">
      <table>
        <colgroup>
          <col style={{ width: "10px" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "50px" }} />
          <col style={{ width: "30px" }} />
          <col style={{ width: "40px" }} />
          <col style={{ width: "50px" }} />
          </colgroup>
        <thead>
          <tr className="sorting">
            <th>No</th>
            <th>거래 내용</th>
            <th >거래 금액</th>
            <th >미수금</th>
            <th >종료일</th>                            
            <th>결제</th>
          </tr>
        </thead>
        <tbody>
            {
              filteredContract?.slice(0,5).map((contract, i) => {
                return (
                  <tr key={i} >
                    <td>{i + 1}</td>
                    <td>{contract.title}</td>
                    <td>{contract.contractAmount}</td>
                    <td>{contract.unpaid}</td>
                    <td>{contract.endDate}</td>
                    <td>
                      {
                        contract.type === "P" ? (
                          <Buttons
                            className="primary small"
                             
                          >
                            결제
                          </Buttons>
                        ) : null
                      }
                    </td>
                  </tr>
                )
              })  
                          
            }    
        </tbody>    
      </table>
    </div>
            
    <div className="ui-list-table sp-mt-10">
        <SummaryChart pie={pie} graph={graph} />
    </div>
            
  </div>
            );
};

export default CompanySummary;


export const SummaryChart = (pie, graph ) => {
  // pie 데이터를 ResponsivePie가 요구하는 형식으로 변환
  const pieData = [
    { id: 'contractAmount', label: 'Contract Amount', value: pie.pie.contractAmount || 0 },
    { id: 'unpaid', label: 'Unpaid', value: pie.pie.unpaid || 0 },
  ];

  // graph 차트를 만들기 위한 데이터
  const graphChart = [
    {
      id: 'Revenue', // 라인 ID
      data: Object.keys(graph).map(year => ({
        x: year.toString(),
        y: graph[year], // 연도별 수익금
      }))
    }
  ];  

  return (
      <div className="flex justify-between">
        <div >
          <PieChart data={pieData} />
        </div>
        <div>
          <GraghChart data= {graphChart}/>
        </div>
      </div>
    )
}

const PieChart = ({ data }) => {
  return (
    <div style={{ width: '500px', height: '500px' }}>  {/* 크기 설정 */}
      <ResponsivePie
        data={data}
        margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
        startAngle={-180}
        innerRadius={0.25}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'blues' }}
        borderWidth={3}
        borderColor={{
          from: 'color',
          modifiers: [['darker', '1.9']],
        }}
        arcLinkLabelsTextOffset={18}
        arcLinkLabelsTextColor="#000000"
        arcLinkLabelsOffset={2}
        arcLinkLabelsDiagonalLength={20}
        arcLinkLabelsStraightLength={23}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsSkipAngle={12}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', '2.1']],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
        ]}
        legends={[]}
      />
    </div>
  );
};

const GraghChart = ({ data }) => { 
  console.log('그래프차트', data);
  return (
    <div>
      <h3>연도별 수익금</h3>
      <div style={{ height: "400px" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }} // X축을 점 형태로 표시
          yScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
            stacked: false,
          }}
          curve="monotoneX" // 곡선의 스타일
          lineWidth={3}
          pointSize={8} // 포인트 크기
          pointColor="rgb(0, 0, 255)" // 포인트 색상
          pointBorderWidth={2}
          pointBorderColor="rgb(255, 255, 255)"
          enableGridX={true}
          enableGridY={true}
          colors={{ scheme: 'category10' }} // 색상 설정
          axisBottom={{
            legend: 'Year',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            legend: 'Revenue',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          enableArea={false} // 면적 표시 안 함
          enablePoints={true} // 점 표시 활성화
        />
      </div>
    </div>
  );

}