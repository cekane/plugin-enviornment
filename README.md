![alt text][logo]
[logo]: https://github.com/cekane/plugin-enviornment/blob/master/src/ms-icon-144x144.png "Windrush"
# Windrush Content Type Plugin Enviornment
## Introduction
An environment for building content type's to plug into windrush. Some exsiting content types:
* Chart
* Image
* Quote
* Header

## Getting started
After the repository is cloned, install all the dependicies with: 
```sh
npm install
```
Now start the node server with:
```sh
node ./config/dev_server
```

## Development
You can find examples of exsisting content types in [examples](https://github.com/cekane/plugin-enviornment/tree/master/examples). If you want to play around with exsisting content types you can copy the editor and viewer directories from an example and paste them over the editor and viewer directories in src/components.

There are two sides to each content type, the content-type-editor, and the content-type-viewer. The editor side is what defines the viewer side. In order for this communication to occur you want to use our higher order component function `handleChange`, and our pre-defined empty prop object `data`.

```js
<input value={ this.props.data.email } onChange = { this.props.handleChange('this.props.data.email')}/>
```

The above code snipet demonstrates how props are maintained. Whenever sombody type's into the input box, handleChange is called and it updates `this.props.data.email`. The attribute `onChange` attaches an object formated like:
```js
var obj = { target: { value: newValue } }
```
where newValue is the current value of the input box. This matters if you want to do a custom onClick function like a counter. Say everytime a button is clicked you want the prop count to increment by 1. This could be written as:
### Editor
```js
<Button type="good" small solid onClick={ 
  function(){
    if(!that.props.data.count)
      that.props.data.count = 0
    var newFields = that.props.data
    newFields.count = newFields.count + 1
    var obj = { target: { value: newFields } }
    that.props.handleChange('that.props.data.count')(obj)
  }
}>
+
</Button>
```
### Viewer
```js
<div>{ this.props.data.count }</div>
```
The difference here is that you have to create your own object to attach to handleChange. 

Now that communication is established between the editor and viewer you can develop any content type you want using react. Some exsisting components that are made available to you are: 

## Deployment
No clue good luck

