import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
 * Neural core — a rotating particle sphere with connecting synapses.
 * Colors are read from the active theme's CSS variables so every
 * theme (dark / light / hp / ironman / netflix) recolors the scene.
 */
function NeuralScene({ theme }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const css = getComputedStyle(document.documentElement);
        const primary = new THREE.Color(css.getPropertyValue('--primary-color').trim() || '#2DE0A5');
        const accent = new THREE.Color(css.getPropertyValue('--accent-2').trim() || '#38BDF8');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            mount.clientWidth / mount.clientHeight,
            0.1,
            100
        );
        camera.position.z = 6.5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        // --- particle sphere ---
        const COUNT = 420;
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const pts = [];
        for (let i = 0; i < COUNT; i++) {
            // fibonacci sphere for even distribution
            const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const r = 2.6 + (Math.random() - 0.5) * 0.25;
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            positions.set([x, y, z], i * 3);
            pts.push(new THREE.Vector3(x, y, z));
            const c = Math.random() > 0.55 ? primary : accent;
            colors.set([c.r, c.g, c.b], i * 3);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({
            size: 0.055,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        // --- synapse lines between close particles ---
        const linePositions = [];
        for (let i = 0; i < COUNT; i++) {
            for (let j = i + 1; j < COUNT; j++) {
                if (pts[i].distanceTo(pts[j]) < 0.72) {
                    linePositions.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
                }
            }
        }
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const lineMat = new THREE.LineBasicMaterial({
            color: primary,
            transparent: true,
            opacity: 0.16,
        });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(lines);

        // --- inner core ---
        const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
        const coreMat = new THREE.MeshBasicMaterial({
            color: accent,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // --- interaction ---
        let targetX = 0;
        let targetY = 0;
        const onPointer = (e) => {
            const rect = mount.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
        };
        mount.addEventListener('pointermove', onPointer);

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf;
        const clock = new THREE.Clock();
        const animate = () => {
            raf = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            if (!reduced) {
                points.rotation.y = t * 0.12 + targetX;
                points.rotation.x = t * 0.04 + targetY;
                lines.rotation.copy(points.rotation);
                core.rotation.y = -t * 0.25;
                core.rotation.z = t * 0.15;
                const pulse = 1 + Math.sin(t * 1.6) * 0.06;
                core.scale.setScalar(pulse);
            }
            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
            mount.removeEventListener('pointermove', onPointer);
            mount.removeChild(renderer.domElement);
            geo.dispose();
            mat.dispose();
            lineGeo.dispose();
            lineMat.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            renderer.dispose();
        };
    }, [theme]);

    return (
        <div
            ref={mountRef}
            style={{ width: '100%', height: '100%', minHeight: 'min(420px, 46vh)' }}
            aria-hidden="true"
        />
    );
}

export default NeuralScene;
