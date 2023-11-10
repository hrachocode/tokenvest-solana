import { RefObject, useEffect, useState } from "react";

const SquaresEffect = ({ animationRef }: { animationRef: RefObject<HTMLDivElement> }) => {
  const [ squaresColumn, setSquaresColumn ] = useState<number>();
  const [ squaresRow, setSquaresRow ] = useState<number>();

  useEffect(() => {
    const { innerWidth: width } = window;
    const squaresRow = Math.ceil(width / 122);
    const { current } = animationRef;
    if (current && current.clientHeight) {
      const squaresColumn = Math.ceil(current?.clientHeight / 122);
      setSquaresColumn(squaresColumn);
    }
    setSquaresRow(squaresRow);
  }, [ animationRef ]);

  return (
    <div
      className="flex w-full absolute top-0 left-0 cursor-pointer z-20 overflow-hidden"
    >
      {
        squaresColumn && squaresRow &&
        Array.from(Array(squaresRow).keys()).map((squareRow) => (
          <div key={squareRow} className="flex flex-col w-full">

            {
              Array.from(Array(squaresColumn).keys()).map((squareColumn) => (
                <div
                  id="light"
                  key={squareColumn}
                  className="min-w-[122px] min-h-[122px] bg-[url('/images/cell.svg')] hover:bg-[url('/images/cell1.svg')] hover:transition duration-200"
                >
                </div>
              ))
            }
          </div>
        ))
      }
    </div>

  );
};

export default SquaresEffect;
