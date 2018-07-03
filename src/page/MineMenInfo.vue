<template>
  <div>
    <!--container-->
    <div class="mine-info-container" v-if="$route.params.PatientId != undefined">
      <div class="mine-info-row">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">账号</div>
          <input type="text" class="flex-1 text-right" placeholder="手机号码" v-model="data.number">
        </div>
      </div>
    </div>
    <div class="mine-info-container">
      <div class="mine-info-row">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">姓名&nbsp;<i class="yellow">*</i></div>
          <input type="text" class="flex-1 text-right" placeholder="请输入姓名" v-model="data.name">
        </div>
      </div>
      <div class="mine-info-row">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">联系电话</div>
          <input type="text" class="flex-1 text-right" placeholder="联系电话" v-model="data.telephone">
        </div>
      </div>
    </div>
    <div class="mine-info-container">
      <div class="mine-info-row select-row active-btn" @click="sexVisible = true">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">性别&nbsp;<i class="yellow">*</i></div>
          <input type="text" class="flex-1 text-right" placeholder="请选择性别" readonly="readonly" v-model="data.genderText">
          <i class="arrow-right flex-0"></i>
        </div>
      </div>
      <div class="mine-info-row select-row active-btn" @click="birthdayOpen('datePicker')">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">出生日期&nbsp;<i class="yellow">*</i></div>
          <input type="text" class="flex-1 text-right" placeholder="请选择出生日期" readonly="readonly" v-model="data.birthday">
          <i class="arrow-right flex-0"></i>
          
        </div>
      </div>
      <div class="mine-info-row">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">证件号码&nbsp;<i class="yellow">*</i></div>
          <input type="text" class="flex-1 text-right" placeholder="请输入证件号码" v-model="data.idcard">
        </div>
      </div>
      <div class="mine-info-row">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">社保号</div>
          <input type="text" class="flex-1 text-right" placeholder="请输入社保号" v-model="data.socialSecurityNo">
        </div>
      </div>
      <div class="mine-info-row">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">紧急联系人</div>
          <input type="text" class="flex-1 text-right" placeholder="请输入电话号码" v-model="tele">
        </div>
      </div>
    </div>
    <div class="mine-info-container">
      <div class="mine-info-row select-row active-btn" @click="popupVisible = true">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">所在地区&nbsp;<i class="yellow">*</i></div>
          <input type="text" class="flex-1 text-right" placeholder="请选择省市" readonly="readonly" v-model="data.areaText">
          <i class="arrow-right flex-0"></i>
          
        </div>
      </div>
      <div class="mine-info-row">
        <div class="hhxh-flex">
          <div class="flex-0 label-box">详细地址&nbsp;<i class="yellow">*</i></div>
          <input type="text" class="flex-1 text-right" placeholder="请输入详细地址" v-model="data.address">
        </div>
      </div>
    </div>
    <mt-datetime-picker
          ref="datePicker"
          type="date"
          :startDate="birthdayConfig.startDate"
          :endDate="birthdayConfig.endDate"
          v-model="birthdayConfig.dateValue"
          @confirm="birthdayChange">
        </mt-datetime-picker>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
        </div>
          <mt-picker :slots="addressSlot" @change="onAddressChange" :visible-item-count="3"></mt-picker>
          </mt-popup>
    <div class="mine-info-submit text-center">
      <button class="active-btn" @click="addPatient">保存</button>
    </div>
   
    <!--container end-->

    <end-footer></end-footer>

    <!--性别弹出框-->
    <div class="msg-box" v-show="sexVisible == true">
      <div class="mask-box"></div>
      <div class="container-box">
        <div class="body-box">
          <div class="mine-info-row active-btn" :class="{active: data.gender == 1}" @click="selectMan">
            <div class="hhxh-flex">
              <button style="height: 100%;">男</button>
            </div>
          </div>
          <div class="mine-info-row active-btn" :class="{active: data.gender == 2}" @click="selectWoman">
            <div class="hhxh-flex">
              <button style="height: 100%;">女</button>
            </div>
          </div>
        </div>
        <div class="bottom-btn">
          <button class="active-btn" @click="sexVisible = false">取消</button>
        </div>
      </div>
    </div>
    <!--性别弹出框结束-->
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import mineMenService from 'SERVICES/mineMenService'
import mineInfoService from 'SERVICES/mineInfoService'
import validators from '../utils/validators'
import {Toast} from 'mint-ui'
export default {
  components: {
    EndFooter
  },
  data: () => ({
    headerData: {
      titel: '就诊人信息',
      toLink: ''
    },
    popupVisible: false,
    sexVisible: false,
    cityVisible: false,
    data: {
      id: '',
      name: '',
      number: '',
      gender: '',
      genderText: '',
      telephone: '',
      birthday: '',
      idcard: '',
      socialSecurityNo: '',
      areaId: '',
      area: {},
      address: '',
      areaText: ''
    },
    tele: '',
    checkDate: '',
    bir: '',
    a: [],
    sexs: [],
    addressSlot: [{
      flex: 1,
      values: [],
      className: 'slot1'
    }],
    birthdayConfig: {
      dateValue: new Date(),
      startDate: new Date('1900-01-01'),
      endDate: new Date()
    },
    citySlots: [
      {
        flex: 1,
        values: Object.keys(address),
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: Object.values(address)[0],
        className: 'slot3',
        textAlign: 'center'
      }
    ],
    addressProvince: '',
    addressCity: '',
    item: {},
    pageNo: 1,
    disableSubmit: true,
    addressChangeData: {
      id: '',
      name: ''
    },
    areaList: []
  }),
  created () {
    this.loadAreaList()
    this.loadInfo()
    this.loadMineInfo()
  },
  mounted () {
    this.sexs = [{
      name: '男',
      method: this.selectMan
    }, {
      name: '女',
      method: this.selectWoman
    }]
  },
  methods: {
    loadAreaList: function () {
      mineInfoService.loadAreaList().then(res => {
        if (res.t) {
          this.areaList = res.t
          this.addressSlot[0].values = res.t.map(a => a.name)
        } else {
          Toast('地区数据异常')
        }
      })
    },
    loadMineInfo: function () {
      mineInfoService.loadMineInfo().then(res => {
        this.tele = res.t.telephone || ''
      })
    },
    onAddressChange: function (picker, values) {
      // this.data.areaId = this.areaList.filter(item => item.name === values[0]).map(a => a.id)
      // console.info('asdf+++>' + this.data.areaId)
      // this.data.areaText = values[0]
      this.addressChangeData.id = this.areaList.filter(item => item.name === values[0]).map(a => a.id)[0]
      this.addressChangeData.name = values[0]
    },
    selectaddress: function () {
      this.data.areaId = this.addressChangeData.id
      this.data.areaText = this.addressChangeData.name
      this.popupVisible = false
    },
    addPatient: function () {
      // for (let val in this.data) {
      //   console.info(val + '===' + this.data[val])
      //   // console.info(validators.isEmojiCharacter())
      // }
      // this.data.areaId = 'cc9c229d324042a491767a8c7341a8bb'
      // console.info('this.data===>' + JSON.stringify(this.data))
      if (this.disableSubmit) {
        this.disableSubmit = false
        if (this.data.name.trim() === '') {
          Toast('请输入就诊人姓名')
        } else if (validators.isEmojiCharacter(this.data.name)) {
          Toast('就诊人姓名包含非法字符')
        } else if (this.data.telephone.trim() === '') {
          Toast('联系电话不能为空')
        } else if (!validators.mobile(this.data.telephone)) {
          Toast('联系电话格式不正确')
        } else if (this.data.gender.trim() === '') {
          Toast('请选择性别')
        } else if (this.data.birthday === '') {
          Toast('请选择出生日期')
        } else if (this.data.idcard.trim() === '') {
          Toast('请输入身份证号码')
        } else if (!validators.isMumOrLetter(this.data.idcard)) {
          Toast('身份证号码格式不正确')
        } else if (this.data.socialSecurityNo.trim() !== '') {
          if (!validators.isMumOrLetter(this.data.socialSecurityNo)) {
            Toast('社保号格式不正确')
          } else {
            this.doAdd()
          }
        } else {
          this.doAdd()
        }
        // else if (this.data.area.trim() === '') {
        //   Toast('请选择省市')
        // }
        this.disableSubmit = true
      }
    },
    doAdd: function () {
      this.a = this.data.birthday.split('-')
      this.bir = this.a[0] + this.a[1] + this.a[2]
      this.checkDate = this.data.idcard.substring(6, 14)
      if (this.checkDate === this.bir) {
        mineMenService.addPatient(this.data).then(res => {
          Toast('添加成功')
          this.disableSubmit = true
          // this.$router.push('/MineMen')
          this.$router.go(-1)
        })
      } else {
        Toast('身份证号与出生日期不匹配')
      }
    },
    loadInfo: function () {
      this.data.id = this.$route.params.PatientId || ''
      // console.info('id===>' + this.data.id)
      if (this.data.id) {
        mineMenService.getPatient(this.data.id).then(res => {
          // console.info('res===>' + JSON.stringify(res))
          this.data.name = res.t.name || ''
          this.data.number = res.t.number || ''
          this.data.gender = res.t.gender || ''
          this.data.genderText = res.t.gender === '1' ? '男' : (res.t.gender === '2' ? '女' : '')
          this.data.telephone = res.t.telephone || ''
          this.data.birthday = res.t.birthtime ? window.moment(res.t.birthtime).format('YYYY-MM-DD') : ''
          this.data.idcard = res.t.idcard || ''
          this.data.socialSecurityNo = res.t.socialSecurityNo || ''
          this.data.area = res.t.area || ''
          this.data.areaId = res.t.area.id
          this.data.areaText = res.t.area.name
          this.data.address = res.t.address
        })
      }
    },
    goInfo: function (id) {
      id !== '' ? this.$router.push({name: 'OrderDetail', params: {orderId: id}}) : Toast('订单id为空')
    },
    selectMan: function () {
      this.data.gender = '1'
      this.data.genderText = '男'
      this.sexVisible = false
    },
    selectWoman: function () {
      this.data.gender = '2'
      this.data.genderText = '女'
      this.sexVisible = false
    },
    birthdayChange: function (value) {
      this.data.birthday = window.moment(value).format('YYYY-MM-DD') // h:mm:ss
    },
    birthdayOpen: function (picker) {
      this.$refs[picker].open()
    },
    onCityChange: function (picker, values) {
      picker.setSlotValues(1, address[values[0]])
      this.addressProvince = values[0]
      this.addressCity = values[1]
      this.data.area = values[0] + values[1]
    }
  }
}
const address = {
  '北京': ['北京'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '上海': ['上海'],
  '天津': ['天津'],
  '重庆': ['重庆'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
  '香港': ['香港'],
  '澳门': ['澳门'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
}
</script>
<style scoped>
.mint-popup-4 {
    width: 100%;
}
.mint-popup-4 .picker-slot-wrapper, .page-popup .mint-popup-4 .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
</style>
