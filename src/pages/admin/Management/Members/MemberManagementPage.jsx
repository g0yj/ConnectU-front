import ServiceMember from "@/app/service/admin/service-users";
import Buttons from "@/components/Buttons";
import DatePicker from "@/components/DatePicker";
import PageNations from "@/components/PageNations";
import usePagination from "@/hooks/usePagination";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useCollapse } from "react-collapsed";
import { NavLink } from "react-router-dom";
import Split from "react-split";
import MemberManagementProvider from "./context/MemberManagementProvider";
import MemberForm from "./common/MemberForm";
import MemberDetailTabs from "./MemberDetail/MemberDetailTabs";
import ExcelDownloader from "@/components/ExcelDownloader";
import useEmailWindow from "@/app/helper/windows-hooks/use-email-window";


// 회원관리(1depth) > 회원관리(2depth)
const MemberManagementPage = () => {
  const { openEmailWindow } = useEmailWindow();
  const [isExpanded, setExpanded] = useState(true);
  const paginationData = usePagination();

  // 목록조회 조건
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [search, setSearch] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [remainingType, setRemainingType] = useState("ALL");
  const [expireType, setExpireType] = useState("ALL");
  const [totalCount, setTotalCount] = useState(0);
  // 조회된 회원 목록
  const [memberList, setMemberList] = useState([]);
  const [excelList, setExcelList] = useState([]); // 페이징처리X

  // 체크박스 관련
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedMemberList, setSelectedMemberList] = useState([]); // 체크박스 선택된 사람들
  
  const [clickedMember, setClickedMember] = useState(null);
  
  const [initialDetailTabsLabel, setInitialDetailTabsLabel] = useState(null);

  const { getCollapseProps } = useCollapse({ isExpanded });
  
  const onChangeDetailTabsLabel = (tab) => {
    setInitialDetailTabsLabel(tab);
  };

  // 검색 조건 request data 만들기
  const makeSearchCondition = useCallback(() => {
    return {
      page: paginationData.page,
      limit: paginationData.limit,
      createDateFrom: startDate ? dayjs(startDate).format("YYYY-MM-DD") : "",
      createDateTo: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
      search,
      keyword,
      remainingType,
      expireType,
      type: "S",
    };
  }, [
    endDate,
    keyword,
    paginationData.limit,
    paginationData.page,
    search,
    startDate,
    remainingType,
    expireType,
  ]);

  const makeExcelData = useCallback(() => {
    return {
      createDateFrom: startDate ? dayjs(startDate).format("YYYY-MM-DD") : "",
      createDateTo: endDate ? dayjs(endDate).format("YYYY-MM-DD") : "",
      search,
      keyword,
      remainingType,
      expireType,
      type: "S",
    };
  }, [
    endDate,
    keyword,
    search,
    startDate,
    remainingType,
    expireType,
  ]);

  // API 호출
  const searchMemberList = useCallback(async () => {
    const saveData = makeSearchCondition();
    const data = await ServiceMember.getList(saveData);
    setTotalCount(data.totalCount);
    paginationData.setTotalPage(data.totalPage);

    setMemberList(data.list); // 회원 목록 표시용
  }, [makeSearchCondition, paginationData]);


  const excelDownload = useCallback(async () => {
    const saveData = makeExcelData();
    const data = await ServiceMember.excel(saveData);
    console.log(data);
    setExcelList(data);
  })
  
  
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
    searchMemberList();
    excelDownload();
  };


  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickSearchBtn();
    }
  }

  const onClickMemberName = (member) => {
    setInitialDetailTabsLabel(initialDetailTabsLabel);
    setClickedMember(member);
  }

  // 회원 체크박스 클릭 기능
const onClickMemberCheckbox = (evt, member) => {
  console.log('체크박스 클릭 메서드 실행');

  setSelectedMemberList((prevSelectedMemberList) => {
    if (evt.target.checked) {
      // 체크박스가 선택되었을 때: member를 배열에 추가
      const newList = [...prevSelectedMemberList, member];
      console.log('선택된 멤버 배열> ', newList);
      return newList;
    } else {
      // 체크박스가 선택 취소되었을 때: member를 배열에서 제거
      const newList = prevSelectedMemberList.filter((m) => m !== member);
      console.log('선택된 멤버 배열> ', newList);
      return newList;
    }
  });
  };
  const onClickSendEmail = () => {
    openEmailWindow(selectedMemberList); // 선택된 멤버 목록을 openEmailWindow로 전달
  };
  

  useEffect(() => {
    searchMemberList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paginationData.page,
    paginationData.limit,
    startDate,
    endDate,
    remainingType,
    expireType,
  ]);

  useEffect(() => {
    excelDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    startDate,
    endDate,
    remainingType,
    expireType,
  ]);

  useEffect(() => {
    if (isSelectedAll) {
      setSelectedMemberList([...memberList]);
    } else {
      setSelectedMemberList([]);
      console.log('배열데이터확인', selectedMemberList);
    }
  }, [isSelectedAll, memberList]);

  return (
    <Split className="lib-split" sizes={[54, 46]} key={clickedMember?.id}>
      <section className="ui-contents-wrap contents-member-management">
        <div className="ui-contents-inner">
          <div className="ui-location-wrap">
            <div className="ui-location-title">회원관리</div>
            <div className="ui-location">
              <NavLink>
                <i className="fa-solid fa-house"></i>
              </NavLink>
              <i className="fa-solid fa-caret-right"></i>
              <strong>회원관리</strong>
            </div>
          </div>

          <div className="flex">
            <div className="ml-auto">
              <Buttons onClick={() => setExpanded((prevExpanded) => !prevExpanded)}>
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
                <col style={{ width: "14%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "14%" }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th>가입일자</th>
                  <td colSpan="3">
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
                  <th>잔여구분</th>
                  <td>
                    <div className="ui-radio-group size-small">
                      {[
                        { key: "ALL", title: "전체" },
                        { key: "REMAINING", title: "잔여있음" },
                        { key: "NOT_REMAINING", title: "잔여없음" },
                      ].map((el, i) => {
                        return (
                          <div key={i}>
                            <input
                              type="radio"
                              id={`${el.key}-${i}`}
                              name="type0"
                              checked={el.key === remainingType}
                              onChange={() => setRemainingType(el.key)}
                            />
                            <label htmlFor={`${el.key}-${i}`}>{el.title}</label>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <th>만료구분</th>
                  <td>
                    <div className="ui-radio-group size-small">
                      {[
                        { key: "ALL", title: "전체" },
                        { key: "EXPIRED", title: "만료" },
                        { key: "NOT_EXPIRED", title: "만료안됨" },
                      ].map((el, i) => {
                        return (
                          <div key={i}>
                            <input
                              type="radio"
                              id={`${el.key}-${i}`}
                              name="EXPIRED"
                              checked={el.key === expireType}
                              onChange={() => setExpireType(el.key)}
                            />
                            <label htmlFor={`expired-${el.key}-${i}`}>{el.title}</label>
                          </div>
                        );
                      })}
                    </div>
                  </td>

                </tr>
                <tr>
                  <th>회원 수</th>
                  <td>
                    <button className="ui-select mid">
                      <select
                        className="input-init"
                        value={paginationData.limit}
                        onChange={(e) => {
                          paginationData.setLimit(e.target.value);
                        }}
                      >
                        <option value={20}>20명</option>
                        <option value={40}>40명</option>
                        <option value={100}>100명</option>
                      </select>
                    </button>
                  </td>
                  <th>검색</th>
                  <td>
                    <div className="flexYCenter gap">
                      <button className="ui-select mid">
                        <select
                          className="input-init"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        >
                          <option value="ALL">- 전체 -</option>
                          <option value="name">이름</option>
                          <option value="loginId">아이디</option>
                          <option value="email">이메일</option>
                          <option value="cellPhone">휴대전화번호</option>
                        </select>
                      </button>
                      <input
                        type="text"
                        className="input-init"
                        placeholder="검색"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={onKeyPress}
                        style={{ maxWidth: 130 }}
                      />
                      <Buttons className="outlined xsmall" onClick={onClickSearchBtn}>
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
              <ExcelDownloader data = {excelList} fileName= "회원목록" sheetName="Users" />
              <Buttons
                className="outlined small"
                onClick ={onClickSendEmail}
              >
                메일발송
              </Buttons>
              <Buttons className="outlined small" >
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
                  <th>No.</th>
                  <th>
                    <div className="flexCenter gap" >
                      이름
                      <i className="fa-solid fa-caret-up txt-error"></i>
                    </div>
                  </th>
                  <th>전화번호</th>
                  <th >이메일</th>
                  <th >수강 만료일</th>
                  <th >잔여</th>
                  <th>
                    <input
                      type="checkbox"
                      checked={isSelectedAll}
                      onChange={(e) => setIsSelectedAll(e.target.checked)}
                    />
                  </th>
                </tr>
              </thead>

              <tbody>
                {memberList?.map((member, i) => {
                  return (
                    <tr key={i} className={`${clickedMember?.id === member?.id ? "active" : ""}`}>
                      <td>{member.listNumber}</td>
                      <td>
                        <Buttons
                          className="ui-link secondary-high small"
                          onClick={() => onClickMemberName(member)}
                        >
                          {member.name}
                        </Buttons>
                        <br />
                        <span>{member.createDate}</span>
                      </td>
                      <td>
                        <Buttons
                          className="ui-link secondary-high small"
                          
                        >
                          <div
                            className="ui-ellipsis"
                            style={{ maxWidth: 80 }}
                            title={member.cellPhone}
                          >
                            {member.cellPhone}
                          </div>
                        </Buttons>
                      </td>
                      <td>
                        <Buttons
                          className="ui-link secondary-high small"
                        >
                          {member.email}
                        </Buttons>
                        <br />
                        <span>{member.company}</span>
                      </td>

                      <td>{member?.expirationDate}</td>
                      <td>{member?.remainingCount}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedMemberList.includes(member)}
                          onChange={ (e) => onClickMemberCheckbox(e, member)}
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
          <MemberManagementProvider
        refreshMemberList={searchMemberList}
        onDeletedMember={() => setClickedMember(null)}
      >
        {clickedMember === null ? (
          <div className="ui-contents-wrap inner-shadow">
            <div className="ui-contents-inner">
              <div className="layout-contents-width">
                <MemberForm />
              </div>
            </div>
          </div>
        ) : (
          <MemberDetailTabs
            member={clickedMember}
            initialLabel={initialDetailTabsLabel}
            onChangeDetailTabsLabel={onChangeDetailTabsLabel}
          />
        )}
      </MemberManagementProvider>
     
    </Split>
  );
};

export default MemberManagementPage;
