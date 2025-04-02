// #vibe-coded

import React, { useState, useRef, useEffect, useCallback } from 'react';

const ColorPicker = ({ bgColor = '#FAFAFA', handleInputChange }) => {
  const [selectedColor, setSelectedColor] = useState(bgColor);
  const [isDragging, setIsDragging] = useState(false);
  const [colorPosition, setColorPosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0); // Valeur initiale neutre

  const colorPanelRef = useRef(null);
  const hueSliderRef = useRef(null);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsv = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }

    return { h: h * 360, s, v };
  };

  const hsvToRgb = (h, s, v) => {
    h = h / 360;
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
      default: r = 0; g = 0; b = 0;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHex = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  useEffect(() => {
    if (bgColor) {
      const rgb = hexToRgb(bgColor);
      if (rgb) {
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        setHue(hsv.h);

        if (colorPanelRef.current) {
          const panelRect = colorPanelRef.current.getBoundingClientRect();
          const x = hsv.s * panelRect.width;
          const y = (1 - hsv.v) * panelRect.height;
          setColorPosition({ x, y });
        }
      }
    }
  }, [bgColor]);

  const updateColor = useCallback((x, y, newHue = hue) => {
    if (!colorPanelRef.current) return;

    const panelRect = colorPanelRef.current.getBoundingClientRect();
    const panelWidth = panelRect.width;
    const panelHeight = panelRect.height;

    const s = Math.max(0, Math.min(1, x / panelWidth));
    const v = Math.max(0, Math.min(1, 1 - (y / panelHeight)));

    const rgb = hsvToRgb(newHue, s, v);
    const hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);

    setSelectedColor(hexColor);
    if (handleInputChange) {
      handleInputChange({ target: { name: 'bgColor', value: hexColor } });
    }
  }, [handleInputChange, hue]);

  const handleColorPanelInteraction = useCallback((e) => {
    if (!colorPanelRef.current) return;

    const panelRect = colorPanelRef.current.getBoundingClientRect();
    let x = e.clientX - panelRect.left;
    let y = e.clientY - panelRect.top;

    x = Math.max(0, Math.min(x, panelRect.width));
    y = Math.max(0, Math.min(y, panelRect.height));

    setColorPosition({ x, y });
    updateColor(x, y);
  }, [updateColor]);

  const handleHueSliderInteraction = (e) => {
    if (!hueSliderRef.current) return;

    const sliderRect = hueSliderRef.current.getBoundingClientRect();
    let y = e.clientY - sliderRect.top;

    y = Math.max(0, Math.min(y, sliderRect.height));
    const newHue = Math.round((y / sliderRect.height) * 360);

    setHue(newHue);
    updateColor(colorPosition.x, colorPosition.y, newHue);
  };

  useEffect(() => {
    if (colorPanelRef.current) {
      const rgb = hexToRgb(selectedColor);
      if (rgb) {
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        const panelRect = colorPanelRef.current.getBoundingClientRect();

        setHue(hsv.h);
        setColorPosition({
          x: hsv.s * panelRect.width,
          y: (1 - hsv.v) * panelRect.height
        });
      }
    }
  }, [selectedColor]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleColorPanelInteraction(e);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleColorPanelInteraction, isDragging]);

  return (
    <div>
      <label htmlFor="bgColor" className="block mb-1">
        Couleur de fond
      </label>
      <div className="flex items-start gap-1.5">

        {/* MAIN COLOR PICKER */}
        <div className="relative">
          <div
            ref={colorPanelRef}
            className="w-48 h-48 relative cursor-pointer rounded-md overflow-hidden"
            onClick={handleColorPanelInteraction}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleColorPanelInteraction(e);
            }}
            style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`}}
          >
            {/* CURSOR */}
            <div
              className="absolute w-3 h-3 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: colorPosition.x,
                top: colorPosition.y,
                boxShadow: '0 0 0 1px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>

        {/* TINT SLIDER */}
        <div
          ref={hueSliderRef}
          className="w-7 h-48 relative cursor-pointer rounded-md overflow-hidden"
          onClick={handleHueSliderInteraction}
          onMouseDown={handleHueSliderInteraction}
          style={{
            background: 'linear-gradient(to bottom, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'
          }}
        >
          <div
            className="absolute w-full h-1 left-0 transform -translate-y-1/2"
            style={{
              top: (hue / 360) * 100 + '%',
              backgroundColor: 'rgba(255,255,255,0.7)',
              borderTop: '1px solid rgba(0,0,0,0.3)',
              borderBottom: '1px solid rgba(0,0,0,0.3)'
            }}
          />
        </div>
      </div>

      {/* COLOR HEX DISPLAY */}
      <div className="flex items-center mt-2 gap-2">
        <input
          type="text"
          value={selectedColor}
          onChange={handleInputChange}
          className="w-20 px-2 py-[5px] text-sm border border-gray-300 rounded-md focus:outline-none uppercase"
        />
      </div>
    </div>
  );
};

export default ColorPicker;