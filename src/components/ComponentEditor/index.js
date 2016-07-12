import React from 'react';
import update from 'react-addons-update';

export function ComponentEditor(WrappedComponent) {
  return class CE extends React.Component {
  	constructor(props){
  		super(props);
      this.state = {
        data: { }
      }
  	}

    populateState(path, value) {
      const that = this;
      var pathArray = path.split('.');
      var i = 0;
      var setAdded = false;
      var curr = that.state;
      while (i < pathArray.length && !setAdded) {
        if (curr[pathArray[i]]) {
          curr = curr[pathArray[i]];
          i++;
        } else {
          setAdded = true;
          pathArray.splice(i+1, 0, '$set');
        }
      }

      if (setAdded && pathArray[pathArray.length - 1] !== '$set') {
        var mut = pathArray.reverse().reduce((carry, x) => {
          var temp = {};
          temp[x] = carry;
          return temp;
        }, value);
        return mut;
      } else {
        return false;
      }
    }

    handleChange(path)
    { 
      const that = this

      if (Array.isArray(path)) {
        console.log("INSIDE ARRAY")
        return function (event) {
          var temp = event.target.value;

          var t = {};
          t.$set = temp;

          var newState = that.state;

          path.forEach(curPath => {
            var p = curPath.split('.');
            var mut = that.populateState(curPath, event.target.value);
            if (!mut) {
              mut = p.reverse().reduce((carry, x) => {
                var temp = {};
                temp[x] = carry;
                return temp;
              }, t)
            }
            newState = update(newState, mut);
          })

          that.setState(newState);
        }
      }

      return function(event){
        console.log("INSIDE NORMAL- EVENT", event)
        var temp = event.target.value;
        if (event.target.getAttribute && event.target.getAttribute('type') === 'checkbox') {
          temp = !!event.target.checked;
        }
        
        if (temp === '__none') {
          temp = undefined;
        }

        var pathArray = path.split('.');
        var method = '$set';

        if (path.indexOf('.src') !== -1) {
          //Need to include normalizeURL
          //temp = normalizeUrl(event.target.value, that.state.data.type);
          method = '$merge';
          pathArray.pop();
        }

        var t = {};
        t[method] = temp;

        var mut = that.populateState(path, event.target.value);
        if (!mut) {
          mut = pathArray.reverse().reduce((carry, x) => {
            var temp = {};
            temp[x] = carry;
            return temp;
          }, t)
        }

        if (path.indexOf('dataConfig.spread') !== -1 && temp !== that.state.data.dataConfig.spread) {
          mut.data.dataConfig.keys = {$set: []};
          mut.data.dataConfig.descriptors = {$set: []};
        }

        if (path.indexOf('dataConfig.sheet') !== -1 && temp !== that.state.data.dataConfig.sheet) {
          mut.data.dataConfig.keys = {$set: []};
          mut.data.dataConfig.descriptors = {$set: []};
        }

        // If we change the chart type, we want to clear all axis brushing
        if (path.indexOf('type') !== -1) {
          mut.data.config.subdomainX = {$set: false};
          mut.data.config.subdomainY = {$set: false};
        }

        // If we set the default icon we want to clear out the specific ones
        if (path.indexOf('defaultIcon') !== -1) {
          mut.data.dataConfig.icons = {$set: {}};
        }

        // When we fiddle with the rows we also need to update the column number.
        // We could work around this by leaving the column count as derived info.
        if (path.indexOf('sizes') !== -1) {
          mut.data.columns = {$set: event.target.value.length};
        }
        console.log("MUT", mut)
        let newState = update(that.state, mut)
        that.setState(newState);
      }
    }

    setProps()
    {
      var hc = this.handleChange.bind(this)
      return { handleChange: hc, data: this.state.data}
    }

    render() {
      const that = this;
      var _props = that.setProps()

      return <WrappedComponent { ..._props }/>
    }
  }
}