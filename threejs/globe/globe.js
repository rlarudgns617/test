
window.onload = function init() 
{
	const canvas = document.getElementById( "gl-canvas" );
	const renderer = new THREE.WebGLRenderer({canvas});
	
	// Earth params
	var radius   = 3,
		segments = 32,
		rotation = 6;  

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.01, 1000);
	camera.position.z = 1.5;

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5,3,5);
	scene.add(light);

    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
	scene.add(sphere)

    var sphereStar = createClouds(radius, segments);
	sphereStar.rotation.y = rotation;
	scene.add(sphereStar)

	var circle = createCircle(radius, segments);
	circle.rotation.y = rotation;
	scene.add(circle)

	const loader = new THREE.GLTFLoader();
	loader.load('dolphing/scene.gltf',function(gltf){
		dolphine = gltf.scene.children[0];
		dolphine.scale.set(30,30,30);
		dolphine.position.set(0,0,0);
		dolphine.rotation.y = rotation;
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	const loader2 = new THREE.GLTFLoader();
	loader2.load('whale/scene.gltf',function(gltf){
		whale = gltf.scene.children[0];
		whale.scale.set(0.6,0.6,0.6);
		whale.position.set(0,5,5);
		whale.rotation.y = rotation;
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	const loader3 = new THREE.GLTFLoader();
	loader3.load('stylized_clouds/scene.gltf',function(gltf){
		cloud = gltf.scene.children[0];
		cloud.scale.set(0.01,0.01,0.01);
		cloud.position.set(0,-3,7);
		cloud.rotation.x = rotation;
		cloud.rotation.y = rotation;
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	const loader4 = new THREE.GLTFLoader();
	loader4.load('stylized_clouds/scene.gltf',function(gltf){
		cloud2 = gltf.scene.children[0];
		cloud2.scale.set(0.01,0.01,0.01);
		cloud2.position.set(3,-2,-3);
		cloud2.rotation.x = rotation;
		cloud2.rotation.y = rotation;
		scene.add(gltf.scene);
		animate();
	}, undefined, function(error){
		console.error(error);
	});

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		clouds.rotation.y += 0.005;
		circle.rotation.y += 0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/puple_basic.png'),
				//bumpMap:     THREE.ImageUtils.loadTexture('images/woods_11zon.jpg'),
				//bumpScale:   0.1,
				//specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				//specular:    new THREE.Color('grey')								
			})
		);
	}
	
	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius+0.05, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/star.png'),
				transparent: true,
				side: THREE.DoubleSide
			})
		);		
	}

	function createCircle(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 3.5, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/music_circle2.png'),
				opacity : 0.7,
				transparent: true,
				side : THREE.DoubleSide,
			})
		);		
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

	function animate(time){
		time *=0.001;
		const speed = 1;
		const rot = time*speed;
		dolphine.position.x = Math.cos(rot)*4;
		dolphine.position.y = Math.sin(rot)*4;
		dolphine.rotation.y = -rot/1.03;

		whale.position.z = Math.cos(rot)*4;
		whale.position.x = Math.sin(rot)*4;
		whale.rotation.x = -rot/1.03;
		renderer.render(scene,camera);
		requestAnimationFrame(animate);
	}


}


