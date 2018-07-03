<template>
    <div>
        <!--h-nav-->
        <div class="hhxh-flex h-nav">
            <div class="flex-1 item text-center" @click="initSearch();goProducts()">
                <div class="img-box"><img src="../../assets/all-icon.png"></div>
                <div class="txt-box title-2">全部</div>
            </div>
            <div class="flex-1 item text-center" @click="searchData.sexVal = '1';goProducts()">
                <div class="img-box"><img src="../../assets/man-icon.png"></div>
                <div class="txt-box title-2">男性</div>
            </div>
            <div class="flex-1 item text-center" @click="searchData.sexVal = '2';goProducts()">
                <div class="img-box"><img src="../../assets/woman-icon.png"></div>
                <div class="txt-box title-2">女性</div>
            </div>
            <div class="flex-1 item text-center" @click="searchData.isoldage = '1';goProducts()">
                <div class="img-box"><img src="../../assets/old-icon.png"></div>
                <div class="txt-box title-2">老人</div>
            </div>
            <div class="flex-1 item text-center" @click="showSearch">
                <div class="img-box"><img src="../../assets/screen-icon.png"></div>
                <div class="txt-box title-2">筛选</div>
            </div>
        </div>
        <!--search options-->
        <div class="search-box" v-show="isShow">
            <div class="item">
                <span class="gray hhxh-left title-2">性别</span>
                <div class="item-options">
                    <a :class="{ active: searchData.sexVal === '0' }"
                       @click="searchData.sexVal = '0'">全部</a>
                    <a v-for="sex in item.sexs"
                       :class="{ active: searchData.sexVal === sex.val }"
                       @click="searchData.sexVal = sex.val;
                               searchData.partsVal = '0';
                               searchData.symptomsVal = '0'">
                       {{sex.text}}
                    </a>
                </div>
            </div>
            <div class="item">
                <span class="gray hhxh-left title-2">年龄</span>
                <div class="item-options">
                    <a :class="{ active: searchData.ageVal === '0' }"
                       @click="searchData.ageVal = '0'">全部</a>
                    <a v-for="age in item.ages"
                       :class="{ active: searchData.ageVal === age.val }"
                       @click="searchData.ageVal = age.val">
                       {{age.text}}
                    </a>
                </div>
            </div>
            <div class="item">
                <span class="gray hhxh-left title-2">部位</span>
                <div class="item-options">
                    <a :class="{ active: searchData.partsVal === '0' }"
                       @click="searchData.partsVal = '0'">全部</a>
                    <a v-for="part in item.parts"
                       :class="{ active: searchData.partsVal === part.val }"
                       @click="searchData.partsVal = part.val;searchData.symptomsVal = '0'"
                       v-show="searchData.sexVal==='0'||searchData.sexVal===part.sex||part.sex==='0'">
                       {{part.text}}
                    </a>
                </div>
            </div>
            <div class="item">
                <span class="gray hhxh-left title-2">症状</span>
                <div class="item-options">
                    <a :class="{ active: searchData.symptomsVal === '0' }"
                       @click="searchData.symptomsVal = '0'">全部</a>
                    <a v-for="symptoms in item.symptoms"
                       :class="{ active: searchData.symptomsVal === symptoms.val }"
                       @click="searchData.symptomsVal = symptoms.val"
                       v-show="(searchData.sexVal==='0'&&searchData.partsVal==='0')
                       ||(searchData.sexVal!=='0'&&searchData.partsVal==='0'&&(symptoms.sex===searchData.sexVal||symptoms.sex==='0'))
                       ||(searchData.sexVal==='0'&&searchData.partsVal!=='0'&&symptoms.part===searchData.partsVal)
                       ||(searchData.sexVal!=='0'&&searchData.partsVal!=='0'&&symptoms.part===searchData.partsVal)">
                       {{symptoms.text}}
                    </a>
                </div>
            </div>
            <div class="btn-box text-right">
                <button class="cancel" @click="showSearch">取消</button>
                <button class="reset" @click="initSearch">重置</button>
                <button class="sure" @click="goProducts">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      isShow: false,
      searchData: {
        sexVal: '0',
        ageVal: '0',
        partsVal: '0',
        symptomsVal: '0',
        isoldage: '0'
      }
    }),
    methods: {
      showSearch: function () {
        this.isShow = !this.isShow
        this.initSearch()
      },
      initSearch: function () {
        this.searchData.sexVal = '0'
        this.searchData.ageVal = '0'
        this.searchData.partsVal = '0'
        this.searchData.symptomsVal = '0'
        this.isoldage = '0'
      },
      goProducts: function () {
        localStorage.setItem('productSearchData', JSON.stringify(this.searchData))
        this.$router.push({path: 'Products', query: this.searchData})
      }
    }
  }
</script>
