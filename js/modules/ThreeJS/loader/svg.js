
import {
    SVGLoader,
    EdgesGeometry,
    ExtrudeGeometry,
    LineBasicMaterial,
    LineSegments,
    Group,
    Mesh,
    MeshBasicMaterial
} from '@THREE';

export default class SVGModelLoader {
    static load(svgData){
        const svgGroup = new Group();
        const updateMap = [];
        svgGroup.scale.set(0.00001, 0.00001, 0.00001);
        svgGroup.position.set(0, 0, 0);
        // svgGroup.scale.y *= -1;

        const fillMaterial = new MeshBasicMaterial({ wireframe: false, opacity: 1, transparent: true });
        const stokeMaterial = new LineBasicMaterial({
            wireframe: false, opacity: 0, transparent: true 
        });
        // Loop through all of the parsed paths
        svgData.paths.forEach((path, i) => {
            const shapes = SVGLoader.createShapes(path);

            // Each path has array of shapes
            shapes.forEach((shape, j) => {
                // Finally we can take each shape and extrude it
                const meshGeometry = new ExtrudeGeometry(shape, {
                    bevelEnabled: false,
                    // amount: 5,
                    // bevelSize: 14,
                    // bevelThickness: 5,
                    // bevelSegments: 15,
                    depth: 1,
                });

                // Create a mesh and add it to the group

                const linesGeometry = new EdgesGeometry(meshGeometry);
                const mesh = new Mesh(meshGeometry, fillMaterial);
                const lines = new LineSegments(linesGeometry, stokeMaterial);
          
                updateMap.push({ shape, mesh, lines });
                svgGroup.add(mesh, lines);
            });
        });
        // const box = new THREE.Box3().setFromObject(svgGroup);
        // const size = box.getSize(new THREE.Vector3());
        // const yOffset = size.y / -2;
        // const xOffset = size.x / -2;
      
        // Offset all of group's elements, to center them
        // svgGroup.children.forEach((item) => {
        //   item.position.x = xOffset;
        //   item.position.y = yOffset;
        // });
        // svgGroup.rotateX(Math.PI / 2);
        return {
            object: svgGroup,
            update(extrusion) {
              updateMap.forEach((updateDetails) => {
                const meshGeometry = new ExtrudeGeometry(
                  updateDetails.shape,
                  {
                    depth: extrusion,
                    // amount: 5,
                    bevelEnabled: false,
                    // bevelSize: 14,
                    // bevelThickness: 5,
                    // bevelSegments: 15,
                  }
                );
                const linesGeometry = new EdgesGeometry(meshGeometry);
        
                updateDetails.mesh.geometry.dispose();
                updateDetails.lines.geometry.dispose();
                updateDetails.mesh.geometry = meshGeometry;
                updateDetails.lines.geometry = linesGeometry;
              });
            },
          };
    }
}