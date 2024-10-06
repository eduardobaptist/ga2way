import React, { useEffect, useRef } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

const ProjectCanvas = () => {
  const gridRef = useRef(null);
  const gridInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize GridStack
    if (gridRef.current && !gridInstanceRef.current) {
      gridInstanceRef.current = GridStack.init(
        {
          float: true,
          cellHeight: "60px",
          minRow: 1,
        },
        gridRef.current
      );

      // Define initial items
      const items = [
        {
          id: "justificativas",
          x: 0,
          y: 0,
          w: 2,
          h: 2,
          content: "Justificativas",
        },
        { id: "produto", x: 2, y: 0, w: 2, h: 2, content: "Produto" },
        { id: "stakeholders", x: 4, y: 0, w: 2, h: 2, content: "Stakeholders" },
      ];

      // Add widgets to the grid
      items.forEach((item) => {
        gridInstanceRef.current.addWidget({
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          content: `
            <div class="bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg group h-full flex flex-col">
              <textarea 
                class="w-full flex-grow box-border p-4 border-none bg-transparent text-gray-800 text-base resize-none overflow-auto rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="${item.content}"
              ></textarea>
              <div class="grid-stack-item-mover bg-[#f0f4f8] hover:bg-gray-300 transition-all duration-300 ease-in-out py-1 px-4 rounded-b-lg cursor-move text-center text-gray-700 font-semibold opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 right-0">
                Mover
              </div>
            </div>
          `,
        });
      });

      // Event listener for grid changes
      gridInstanceRef.current.on("change", (event, items) => {
        console.log("Grid changed:", items);
      });
    }

    // Cleanup function
    return () => {
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy(false);
        gridInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="grid-stack bg-muted/40 border-2 rounded-lg" ref={gridRef}>
      {/* GridStack will populate this div */}
    </div>
  );
};

export default ProjectCanvas;
