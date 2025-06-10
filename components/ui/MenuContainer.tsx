"use client";

export default function MenuContainer({children}: {children: React.ReactNode}) {
  return (
    <div
        className="overflow-x-auto menu-container rounded-lg p-4"
        style={{ userSelect: "none" }}
        onMouseDown={(e) => {
        const container = e.currentTarget;
        let startX = e.pageX - container.offsetLeft;
        let scrollLeft = container.scrollLeft;

        function onMouseMove(ev: MouseEvent) {
        const x = ev.pageX - container.offsetLeft;
        container.scrollLeft = scrollLeft - (x - startX);
        }

        function onMouseUp() {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        }}
    >
        {children}
    </div>
  )
}
