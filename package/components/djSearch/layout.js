export default {
  name: "search",
  data() {
    return {
      columnsDataArr: {
        3: [],
        4: [],
        5: []
      },
      dropDownFlag: true, // 是否折叠
      columnsNumber: 5, // 实时显示的列数
      normalItemWidth: 320,
      longItemWidth: 640,
      currentStatus: 'two-five' // one-three one-four two-four two-five
    };
  },
  watch: {
    isDropDown(newVal, oldVal) {
      this.dropDownFlag = newVal !== oldVal;
    },
  },
  mounted() {
    this.init();
  },
  computed: {
    searchHeight() {
      return this.currentStatus.includes('one') || this.totalCount < this.columnsNumber ? 56 : 102;
    },
    totalCount() {
      return this.config.reduce((sum, item) => {
        return this.isDateRangeType(item) ? sum + 2 : sum + 1;
      }, 0);
    },
    isDropDown() {
      if (this.currentStatus.includes('two')) {
        return this.totalCount >= 2 * this.columnsNumber;
      } else {
        return this.totalCount >= this.columnsNumber;
      }
    },
    sliceFoldData() {
      if (this.isDropDown) {
        let index = 0;
        let sum = 0;
        for (let i = 0; i < this.columnsDataArr[this.columnsNumber].length; i++) {
          if (this.isDateRangeType(this.columnsDataArr[this.columnsNumber][i])) {
            sum = sum + 2;
          } else {
            sum++;
          }
          if (sum === 2 * this.columnsNumber || i === this.columnsDataArr[this.columnsNumber].length - 1) {
            index = i;
            break;
          }
        }
        return this.columnsDataArr[this.columnsNumber].slice(0, index);
      } else {
        return this.columnsDataArr[this.columnsNumber];
      }
    },
    oneLineSliceFoldData() {
      let columnsDataArr = this.columnsDataArr[this.columnsNumber].slice(0, this.columnsNumber - 1);
      let arr = columnsDataArr.reduce((sum, item, index) => {
        if (this.isDateRangeType(item)) sum.push(index);
        return sum;
      }, []);
      if (this.isDropDown && arr.length !== 0) {
        switch (this.columnsNumber) {
          case 3: return [ columnsDataArr[ arr[0 ] ]];
          case 4:
            if (arr.length === 1) {
              for (let item of columnsDataArr) {
                if (!this.isDateRangeType(item)) {
                  let sliceArr = columnsDataArr.slice();
                  sliceArr.splice(columnsDataArr.indexOf(item), 1);
                  return sliceArr;
                }
              }
            } else if (columnsDataArr.length === 3 && arr.length === 2) {
              let sliceArr = columnsDataArr.slice();
              sliceArr.splice(arr[0], 1);
              return sliceArr;
            } else {
              return [ columnsDataArr[ arr[0] ] ];
            }
        }
      }
      return columnsDataArr;
    },
    showData() {
      if (this.dropDownFlag) {
        switch (this.currentStatus) {
          case 'one-three':
          case 'one-four':
            return this.oneLineSliceFoldData;
          case 'two-four':
          case 'two-five':
            return this.sliceFoldData;
        }
      }
      return this.columnsDataArr[this.columnsNumber];
    },
  },
  methods: {
    isDateRangeType(item) {
      if (item.attrs && item.attrs.type) {
        if (item.attrs.type === 'datetimerange' || item.attrs.type === 'daterange' || item.attrs.type === 'datedup') {
          return true;
        }
      }
      if (item.type === 'custom' && item.size === 'long') {
        return true;
      }
      return false;
    },
    hover() {
      this.isDropDown && (this.dropDownFlag = false);
    },
    clickOutSide() {
      this.dropDownFlag = true;
    },
    arrangeData(arr, columnsNumber, flag) {
      arr.reduce((sum, item, index) => {
        if (this.isDateRangeType(item)) sum.push(index);
        return sum;
      }, []).forEach((index, key) => {
        if ((index + key + 1) % columnsNumber === 0) {
          if (!this.isDateRangeType(arr[index - 1])) {
            [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
          } else {
            if (arr[index + 1] && !this.isDateRangeType(arr[index + 1])) {
              [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
            } else {
              if (!this.isDateRangeType(arr[0])) {
                [arr[0], arr[index]] = [arr[index], arr[0]];
                flag = true;
              }
            }
          }
        }
      });
      flag && this.arrangeData(this.columnsDataArr[columnsNumber], columnsNumber, false);
    },
    resizeData() {
      for (let columnsNumber of Object.keys(this.columnsDataArr)) {
        let arr = [...this.config];
        this.columnsDataArr[columnsNumber] = arr;
        if (columnsNumber !== 5 && arr.length > 2) {
          this.arrangeData(this.columnsDataArr[columnsNumber], columnsNumber, false);
        }
      }
    },
    resizeObserver() {
      let clientWidth = this.$refs.searchContent.clientWidth;
      this.normalItemWidth = 320;
      this.longItemWidth = 640;
      if (clientWidth < 1300) {
        this.columnsNumber = 3;
        this.currentStatus = 'one-three';
      } else if (clientWidth < 1460 && clientWidth >= 1300) {
        this.columnsNumber = 4;
        this.currentStatus = 'one-four';
      } else if (clientWidth < 1820 && clientWidth >= 1460) {
        this.columnsNumber = 4;
        this.normalItemWidth = 360;
        this.longItemWidth = 720;
        this.currentStatus = 'two-four';
      } else {
        this.columnsNumber = 5;
        this.normalItemWidth = 360;
        this.longItemWidth = 720;
        this.currentStatus = 'two-five';
      }
    },
    init() {
      this.resizeData();
      this.resizeObserver();
      this.addListener(this.$refs.searchContent, 'resizeObserver', this.resizeObserver);
    },
  }
};
