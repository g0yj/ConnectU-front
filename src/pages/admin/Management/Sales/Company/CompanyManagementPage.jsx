import Buttons from "@/components/Buttons";
import DatePicker from "@/components/DatePicker";
import Split from "react-split";
import ExcelDownloader from "@/components/ExcelDownloader";
import PageNations from "@/components/PageNations";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import usePagination from "@/hooks/usePagination";
import { useCollapse } from "react-collapsed";
import dayjs from "dayjs";
import ServiceCompany from "@/app/service/admin/service-companys";

// 매출관리(1depth) > 업체관리(2depth)
const CompanyManagementPage = () => {
  
  const [isExpanded, setExpanded] = useState(true);
  const paginationData = usePagination();

  // 목록조회 조건
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();  
  const [active, setActive] = useState(null); // 계약여부
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  
  //const key = useState([]);

  //조회된 업체 목록
  const [companyList, setCompanyList] = useState([]);

  //체크박스 관련
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedCompanyList, setCompanayList] = useState([]);

  // 상세조회를 위함
  const [clickedCompanyName, setClickedCompanyName] = useState(null);
  const [initialDetailTabsLabel, setInitialDetailTabsLabel] = useState(null);
  const { getCollapseProps } = useCollapse({ isExpanded });
  const [clickedCompany, setClickedCompany] = useState(null);
  const onChangeDetailTabsLabel = (tab) => {
    setInitialDetailTabsLabel(tab);
  };


  // 검색 조건
  const makeSearchCondition = useCallback(() => {
    return {
      page: paginationData.page,
      limit: paginationData.limit,
      startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
      search,
      keyword,
      active
    };
  }, [
    paginationData.page,
    paginationData.limit,
    startDate,
    endDate,
    search,
    keyword,
    active
  ])
  // 목록조회 API 호출
  const searchCompanyList = useCallback(async () => {
    const saveData = makeSearchCondition();
    const data = await ServiceCompany.getList(saveData);
    setTotalCount(data.totalCount);
    paginationData.setTotalPage(data.setTotalPage);
    setCompanyList(data.list);
  }, [
    makeSearchCondition, paginationData]);
  
  
   // 캘린더 버튼 클릭 기능들
  const onClickCalendarClearBtn = () => {
    setStartDate(null);
    setEndDate(null);
    setSearch("ALL");
    setKeyword("");
  };
  const onClickCalendarThisMonthBtn = () => {
    const now = new Date();
    setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setEndDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  };
  const onClickCalendarPrevMonthBtn = () => {
    const now = new Date();
    setStartDate(new Date(now.getFullYear(), now.getMonth() - 1, 1));
    setEndDate(new Date(now.getFullYear(), now.getMonth(), 0));
  };
  const onClickCalendarThisYearBtn = () => {
    const now = new Date();
    setStartDate(new Date(now.getFullYear(), 0, 1));
    setEndDate(new Date(now.getFullYear(), 11, 31));
  };

  const onClickSearchBtn = () => {
    searchCompanyList();

  }; 

  useEffect(() => {
    searchCompanyList();
  }, [
    paginationData.page,
    paginationData.limit,
    startDate,
    endDate,
    active,
  ]);


  return (

    <Split className="lib-split" sizes={[54, 46]} key = {clickedCompany?.id}>
      <section className="ui-contents-wrap contents-member-management">
        <div className="ui-contents-inner">
          <div className="ui-location-wrap">
            <div className="ui-location-title">업체관리</div>
            <div className="ui-location">
              <NavLink>
                <i className="fa-solid fa-house"></i>
              </NavLink>
              <i className="fa-solid fa-caret-right"></i>
              <strong>업체관리</strong>
            </div>
          </div>

          <div className="flex">
            <div className="ml-auto">
              <Buttons onClick={()=> setExpanded((prevExpanded) => !prevExpanded)}>
                <span className="flexYCenter gap">
                  <span className={`${isExpanded ? "tf-rotate" : ""}`}>
                    <i className="fa-solid fa-circle-chevron-down txt-secondary"></i>
                  </span>                
                  <span className="size-bodyS">상세검색</span>
                </span>
              </Buttons>
            </div>
          </div>
          <div className="ui-info-table" {...getCollapseProps()}>
            <table>
              <colgroup>
                <col style={{ width: "9%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "9%" }} />
                <col style= {{width:"25%"}} />
              </colgroup>
              <tbody>
                <tr>
                  <th>계약기간</th>
                  <td colSpan="5">
                    <div className="flexYCenter gap">
                      <div className="ui-datepicker-wrap">
                        <div>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectStart
                            startDate={startDate}
                            endDate={endDate}
                          ></DatePicker>
                        </div>
                        <div>~</div>
                        <div>
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectStart
                            startDate={startDate}
                            endDate={endDate}
                          ></DatePicker>
                        </div>
                      </div>

                      <Buttons
                        className="ui-button outlined xsmall"
                        onClick={onClickCalendarClearBtn}
                      >
                        Clear
                      </Buttons>
                      <Buttons
                        className="ui-button outlined xsmall"
                        onClick={onClickCalendarThisMonthBtn}
                      >
                        당월
                      </Buttons>
                      <Buttons
                        className="ui-button outlined xsmall"
                        onClick={onClickCalendarPrevMonthBtn}
                      >
                        전월
                      </Buttons>
                      <Buttons
                        className="ui-button outlined xsmall"
                        onClick={onClickCalendarThisYearBtn}
                      >
                        금년
                      </Buttons>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>조회 수</th>
                  <td>
                    <button className="ui-select mid" style ={{width:"63px"}}>
                      <select
                        className="input-init "
                      >
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={100}>100</option>
                      </select>
                    </button>
                  </td>
                  <th style={{ width: "60px" }}>계약여부</th>
                  <td>
                    <div className="ui-radio-group size-small">
                      {
                        [
                          { key: null , title: "전체" },
                          { key: true, title: "진행" },
                          { key: false, title: "종료"},
                        ].map((el, i) => {
                          return (
                            <div key={i}>
                              <input
                                type="radio"
                                id={`${el.key}-${i}`}
                                name="status" 
                                checked={el.key === active}
                                onChange={ ()=> setActive(el.key)}
                              />
                              <label htmlFor={`${el.key}-${i}`}>{el.title}</label>
                            </div>
                        )})
                      }
                    </div>
                  </td>
                  <th>검색</th>
                  <td>
                    <div className="flexYCenter gap">
                      <button className="ui-select mid">
                        <select
                          className="input-init"
                          onChange={(e) => setSearch(e.target.value)}
                        >
                          <option value="ALL">- 전체 -</option>
                          <option value="name">회사명</option>
                          <option value="representative">대표자명</option>
                          <option value="phone">회사번호</option>
                          <option value="email">이메일</option>
                        </select>
                      </button>
                      <input
                        type="text"
                        className="input-init"
                        placeholder="검색"
                        style={{ maxWidth: 130 }}
                      />
                      <Buttons className="outlined xsmall" onClick={onClickSearchBtn} >
                        <span className="flexYCenter gap">
                          <i className="fa-solid fa-magnifying-glass"></i>
                          검색
                        </span>
                      </Buttons>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="layout-between sp-mt-10">
            <div>
              <div className="size-bodyXS">
                <strong className="m">Total :</strong>{" "}
                <strong className="b txt-secondary">{totalCount}</strong>{" "}
                <span className="txt-grey600">건</span>
              </div>
            </div>

            <div className="gap-s">
              <ExcelDownloader fileName= "회원목록" sheetName="Users" />
              <Buttons
                className="outlined small"
              >
                메일발송
              </Buttons>
              <Buttons
                className="outlined small"
              >
                SMS발송
              </Buttons>
            </div>
          </div>

          <div className="ui-list-table sp-mt-10">
            <table>
              <colgroup>
                <col style={{ width: 60 }} />
              </colgroup>
              <thead>
                <tr className="sorting">
                  <th>No</th>
                  <th>
                    <div className="flexCenter gap" style={{width:100, justifyContent: 'center', lignItems: 'center'}} >
                      회사명
                    </div>
                  </th>
                  <th>최근 거래 내용</th>
                  <th >회사번호</th>
                  <th >이메일</th>
                  <th >계약종료일</th>
                  <th>
                    <input
                      type="checkbox"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {companyList?.map((company, i) => {
                  return (
                    <tr key={i} className={`${clickedCompany?.id === company?.id ? "active" : ""}`}>
                      <td>{company.listNumber}</td>
                      <td>
                        <Buttons
                          className="ui-link secondary-high small"
                          
                        >
                          {company.name}
                        </Buttons>
                      </td>
                      <td>
                        <Buttons
                          className="ui-link secondary-high small"
                          
                        >
                          <div
                            className="ui-ellipsis"
                            style={{ maxWidth: 200}}
                            title={company.cellPhone}
                          >
                            {company.title}
                          </div>
                        </Buttons>
                      </td>
                      <td>{company.phone}</td>

                      <td>{company.email}</td>
                      <td>{company.endDate}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedCompanyList.includes(company)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <PageNations key={paginationData.startPage} data={paginationData} />
          </div>
        </div>
      </section>
 
     
    </Split> 
    );
  
};

export default CompanyManagementPage;
