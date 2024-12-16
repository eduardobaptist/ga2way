import React, { useEffect, useRef, useState, useCallback } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

const ProjectCanvas = ({ setCanvasData }) => {
  const gridRef = useRef(null);
  const [grid, setGrid] = useState(null);

  const saveCanvasData = useCallback(() => {
    if (grid) {
      const serializedData = grid.save();

      const enrichedData = serializedData.map((widget) => {
        const gridItem = gridRef.current.querySelector(
          `.grid-stack-item[gs-x="${widget.x}"][gs-y="${widget.y}"]`
        );
        const textarea = gridItem?.querySelector("textarea");

        return {
          ...widget,
          textarea_value: textarea?.value || "",
        };
      });

      setCanvasData(enrichedData);
    }
  }, [grid, setCanvasData]);

  useEffect(() => {
    if (!gridRef.current || grid) return;

    const newGrid = GridStack.init(
      {
        float: true,
        cellHeight: "60px",
        minRow: 1,
        animate: true,
      },
      gridRef.current
    );

    setGrid(newGrid);

    return () => {
      if (newGrid) {
        newGrid.destroy(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!grid) return;

    const items = [
      {
        x: 0,
        y: 0,
        w: 2,
        h: 3,
        content: "Justificativas",
        bg: "bg-yellow-200",
        bg_header: "bg-yellow-100",
      },
      {
        x: 0,
        y: 3,
        w: 2,
        h: 3,
        content: "Objetivo smart",
        bg: "bg-yellow-200",
        bg_header: "bg-yellow-100",
      },
      {
        x: 0,
        y: 6,
        w: 2,
        h: 5,
        content: "Benefícios",
        bg: "bg-yellow-200",
        bg_header: "bg-yellow-100",
      },
      {
        x: 2,
        y: 0,
        w: 2,
        h: 3,
        content: "Produto",
        bg: "bg-purple-200",
        bg_header: "bg-purple-100",
      },
      {
        x: 2,
        y: 3,
        w: 2,
        h: 8,
        content: "Requisitos",
        bg: "bg-purple-200",
        bg_header: "bg-purple-100",
      },
      {
        x: 4,
        y: 0,
        w: 2,
        h: 4,
        content: "Stakeholders",
        bg: "bg-pink-200",
        bg_header: "bg-pink-100",
      },
      {
        x: 4,
        y: 4,
        w: 2,
        h: 4,
        content: "Equipe",
        bg: "bg-pink-200",
        bg_header: "bg-pink-100",
      },
    ];

    items.forEach(({ x, y, w, h, content, bg, bg_header }) => {
      const widget = grid.addWidget({
        x,
        y,
        w,
        h,
        content: `
          <div class="grid-stack-item-content ${bg} rounded-lg outline-none shadow-md transition-all duration-300 ease-in-out hover:shadow-lg group h-full flex flex-col">
            <div class="w-full h-max grid-stack-item-mover text-gray-400 cursor-move ${bg_header} px-4 py-2 flex justify-between items-center">
              <span>${content}</span>
              <span class="text-black opacity-0 group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip"><circle cx="12" cy="5" r="1"></circle><circle cx="19" cy="5" r="1"></circle><circle cx="5" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="19" cy="19" r="1"></circle><circle cx="5" cy="19" r="1"></circle></svg>
              </span>
            </div>
            <textarea
              class="w-full h-full outline-none px-4 py-2 ${bg} focus:outline-none flex-grow box-border text-gray-800 resize-none overflow-auto rounded-lg placeholder-gray-400"
            ></textarea>
          </div>`,
      });
    });

    grid.on("change", saveCanvasData);
    grid.on("added removed", saveCanvasData);

    saveCanvasData();

    return () => {
      grid.off("change", saveCanvasData);
      grid.off("added removed", saveCanvasData);
    };
  }, [grid, saveCanvasData]);

  return (
    <div
      className="grid-stack bg-muted/40 border-2 rounded-lg gap-2"
      ref={gridRef}
    ></div>
  );
};

export default ProjectCanvas;
