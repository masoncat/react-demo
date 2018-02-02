/**
 * Created by qitmac000274 on 2017/12/19.
 */
import './advertising.scss';
// import CustomInput from '@qnpm/nb/component/Form/CustomInput';
// import Keyboard from '@qnpm/nb/component/Keyboard';
// import DatePickerInput from '@qnpm/nb/component/Form/DatePickerInput';
// import Header from '../../components/Header'

import React from 'react';
import _trim from 'lodash/trim';

const classnames = require('classnames');
const bt_ready = '//s.qunarzz.com/imall/iagent/slogan/bt-ready1.png';
const bt_click = '//s.qunarzz.com/imall/iagent/slogan/bt-click1.png';
// const dateUtil = require('../../util/date');
// import {ua} from '../../util/ua';
const isQunar = true;
// import {getQuery} from '../../util/util';

class Advertising extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            gender: 1,
            birthday: '',
            phone: '',
            showClause: true,
            imgSrc: bt_ready,
            showHeader: true
        };
    }

    componentDidMount() {
        let url = location.href;
        var reg = /source/;
        let showHeader = reg.test(url);
        this.setState({showHeader: showHeader})
    }

    genderClick(value) {
        this.setState({
            gender: value
        })
    }

    submit() {
        gw.report('click', '点击提交按钮');
        const msg = valid(this.state);
        if (msg) {
            return Ralert(msg);
        }
        let parmas = getParams(this.state);
        this.setState({imgSrc: bt_click});
        $.post('./api/advertisingSubmit', {data: JSON.stringify(parmas)}).always(result => {
            this.setState({imgSrc: bt_ready});
            const {status = '', message = ''} = result;
            if (status) {
                return Ralert(message);
            } else {
                return Ralert(message, [{
                    desc: '确认',
                    callback: () => {
                        gw.NBRouter('back');
                    }
                }], 2);
            }
        });
    }

    render() {
        const {gender, birthday, phone, showClause, imgSrc, showHeader} = this.state;
        return (
            <section id="advertising" className={showHeader ? 'R-page': ''}>
                {/*{*/}
                    {/*showHeader && <Header title="去哪儿保险"/>*/}
                {/*}*/}
                <img className="advertising-bg" src="//s.qunarzz.com/imall/iagent/slogan/bg2.png" width={innerWidth}/>
                <section className="adts-content">
                    <img src="//s.qunarzz.com/imall/iagent/slogan/txbg.png" className="adts-img"/>
                    <section className={classnames("adts-fill", {"touch-fill": !isQunar})}>
                        <div className="adts-name-gender adts-sup">
                            <div className="name-sup">
                                <label>姓名:</label>
                                <input type="text" className="adts-name"
                                       onChange={(e) => {
                                           this.setState({name: e.target.value})
                                       }}
                                       maxLength={10}
                                />
                            </div>
                            <div className="gender-sup">
                                <div
                                    className={classnames("gender-male", {"gender-check": gender === 1})}
                                    onClick={() => {
                                        this.genderClick(1)
                                    }}
                                >
                                    男
                                </div>
                                <div
                                    onClick={() => {
                                        this.genderClick(2)
                                    }}
                                    className={classnames("gender-female", {"gender-check": gender === 2})}
                                >
                                    女
                                </div>
                            </div>
                        </div>
                        <div className="adts-age adts-sup icon i-back2">
                            {/*<DatePickerInput*/}
                                {/*className="adts-age-pick"*/}
                                {/*title="选择生日"*/}
                                {/*dateTpl={["yyyy年", "M月", "d日"]}*/}
                                {/*startRange={dateUtil.addYear(new Date(), -100).getTime()}*/}
                                {/*endRange={new Date().getTime()}*/}
                                {/*onChange={(value = '') => {*/}
                                    {/*this.setState({birthday: value});*/}
                                {/*}}*/}
                                {/*defaultValue='1985-6-15'*/}
                                {/*valueTpl={"yyyy-MM-dd"}*/}
                                {/*value={birthday}*/}
                            {/*/>*/}
                        </div>
                        <div className="adts-captcha adts-sup">
                            {/*<CustomInput*/}
                                {/*title={'输入手机号:'}*/}
                                {/*type="number"*/}
                                {/*onChange={(value) => {*/}
                                    {/*this.setState({phone: value})*/}
                                {/*}}*/}
                                {/*value={phone}*/}
                                {/*maxLength="11"*/}
                            {/*/>*/}
                        </div>
                        <div className="adts-clause">
                            <p
                                className={classnames('icon', {'i-checked': showClause}, {'i-uncheck': !showClause})}
                                onClick={() => {
                                    this.setState({showClause: !showClause})
                                }}
                            >同意中英人寿通过950951专线致电确认保障生效事宜</p>
                        </div>
                        <div
                            className="adts-sup adts-button"
                            onClick={this.submit}
                        >
                            <img className="adts-bt-click" src={imgSrc} alt=""/>
                            <img src={bt_click} alt="" style={{display: 'none'}}/>
                        </div>
                    </section>
                </section>
                {/*<Keyboard scrollInstance={80}/>*/}
            </section>
        )
    }
}

function valid(obj) {
    const {birthday, phone, name, showClause} = obj;
    let msg = '';
    if (!_trim(name)) {
        msg = '请输入姓名';
    } else if (!birthday) {
        msg = '请选择生日';
    } else if (!/1\d{10}/.test(phone)) {
        msg = '请输入正确的手机号';
    } else if (!showClause) {
        msg = '请同意相关事宜';
    }
    return msg;
}

function getParams(obj) {
    const {birthday, phone, name, gender} = obj;
    let userSex = '';
    if (gender === 1) {
        userSex = 'male'
    } else if (gender === 2) {
        userSex = 'female'
    }
    return {
        birthday,
        userMobile: phone,
        userName: _trim(name),
        userSex: userSex,
        campaign: 12345678,
        subCampaign: getQuery('subCampaign')
    }
}

export default Advertising;
