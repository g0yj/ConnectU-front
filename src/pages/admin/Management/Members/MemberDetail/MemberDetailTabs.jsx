import Tabs from "@/components/Tabs";
import MemberDetailBasic from "./tabs/MemberDetailBasic";


const MemberDetailTabs = ({ member, initialLabel, onChangeDetailTabsLabel }) => {
  return (
    <div className="ui-contents-wrap inner-shadow">
      <div className="ui-contents-inner">
        <div className="layout-contents-width">
          <div className="ui-tabs-large">
            <Tabs defaultActiveTab={initialLabel} onChangeTab={onChangeDetailTabsLabel}>
              <div label="기본">
                <MemberDetailBasic memberId={member.id} />
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailTabs;
