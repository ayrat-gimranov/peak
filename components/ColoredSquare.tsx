type ColoredSquareProps = {
  color: string,
};

const ColoredSquare = ({ color }: ColoredSquareProps) => (
  <div
    style={{ backgroundColor: color }}
    className="w-10 h-10"
  ></div>
);

export default ColoredSquare;
