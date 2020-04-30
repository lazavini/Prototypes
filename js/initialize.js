function initialize() {
    var scene, camera, renderer, clock, deltaTime, totalTime, arToolkitSource, arToolkitContext,markerRoot1, markerRoot2, mesh1,mover;

    scene = new THREE.Scene();

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	scene.add( ambientLight );
	camera = new THREE.Camera();
	scene.add(camera);
	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
    });
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( 640, 480 );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;
	keyboard = new Keyboard();
	let loader = new THREE.TextureLoader();


	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});

	function onResize()
	{
		arToolkitSource.onResize()
		arToolkitSource.copySizeTo(renderer.domElement)
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
		}
	}
	arToolkitSource.init(function onReady(){
		onResize()
	});
	// handle resize event
	window.addEventListener('resize', function(){
		onResize()
	});
	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});

	// copy projection matrix to camera when initialization complete
	arToolkitContext.init( function onCompleted(){
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// build markerControls - mudar para marcador proprio
	markerRoot = new THREE.Group();
	scene.add(markerRoot);
	let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
		type: 'pattern', patternUrl: "data/hiro.patt",
    })
    
    var obj = {
        'marker_root': markerRoot,
		'clock': clock,
		'deltaTime': deltaTime,
		'totalTime': totalTime,
        'renderer': renderer,
        'scene': scene,
        'camera': camera,
        'arToolkitSource': arToolkitSource,
        'arToolkitContext': arToolkitContext
    }
    
    return obj;
}