import React from 'react';
import { sample } from './../utilities/helpers';

class Bulletin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: '',
      messages: [
        '在非洲，每六十秒，就有一分鐘過去',
        '凡是每天喝水的人，有高機率在 100 年內死去',
        '每呼吸 60 秒，就減少一分鐘的壽命',
        '誰能想的到，這名 16 歲少女，在四年前，只是一名 12 歲少女',
        '台灣人在睡覺時，大多數的美國人都在工作',
        '當蝴蝶在南半球拍了兩下翅膀，牠就會稍微飛高一點點',
        '據統計，未婚生子的人數中有高機率為女性',
        '只要每天省下買一杯奶茶的錢，十天後就能買十杯奶茶',
        '當你的左臉被人打，那你的左臉就會痛',
        '台灣競爭力低落，在美國就連小學生都會說流利的英語',
        '我爸跟我媽同一天結婚',
        '研究顯示，過越多生日的人越長壽',
        '當我眼睛閉上時 我就看不到',
        '馬油是馬做的，綿羊油是綿羊做的，嬰兒油不是嬰兒做的'
      ]
    };
  }

  componentDidMount() {
    this.setState({
      currentMessage: sample(this.state.messages)
    });
  }

  render() {
    return (
      <div className="message message-bulletin">
        <div className="message-content">{this.state.currentMessage}</div>
      </div>
    );
  }
}

export default Bulletin;
