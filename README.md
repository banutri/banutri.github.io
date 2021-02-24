# Myalert

A simple Bootsrap alert using Jquery Library

### Prepare Some Stuff

<p>Before using Myalert, <strong>First</strong> you must add Bootstrap css and Jquery library script to your project.</p>

<p>Bootstrap v3.x.x or higher</p>

<p>Jquery v1.7 or higher</p>

<p><strong>Second</strong>, load myalert.css and myalert.js to your project. you can find this files inside <a href="https://github.com/banutri/Myalert/tree/main/css">css</a> and <a href="https://github.com/banutri/Myalert/tree/main/js">js</a> folder.</p>
<p><strong>Third</strong>, add these code inside body tag</p>

```html
<div class="myalert"></div>
```

<p><strong>Fourth</strong>, initialize with these code </p>

```html
<script>
   Myalert({
    type:"success",
    timeout:1000,
    message:"Hi!, I'm simple alert"
  })
</script>
```

### The Properties

There are 5 properties you can use for configuring Myalert
- type
- timeout
- message
- slideDown
- slideUp

#### type Property
type property is a type of alert according to Bootstrap color. You can use success, warning, danger, info and primary for coloring the background of alert. If you choose none of them, the color will be dark.
example :

```
type:"success",
```

#### timeout Property
timeout property is a how long alert for dissapear in milisecond. leave it empty for default (1000ms). 
example :

```
timeout:2000,
```


#### message Property
message property is a message inside the alert.
example :

```
message:"Hello world",
```

#### slideDown Property
slideDown property is a how long alert for sliding down in milisecond. leave it empty for default (500ms). 
example :

```
slideDown:1000,
```

#### slideDown Property
slideDown property is a how long alert for sliding up in milisecond. leave it empty for default (500ms). 
example :

```
slideUp:1000,
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
