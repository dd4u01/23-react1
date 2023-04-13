import React, { useState, useEffect } from "react";
import useCounter from "./useCounter";

const MAX_CAPACITY = 10;

function Accommodate(props) {
    const [isFull, setIsfull] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(0);

    useEffect(() => {
        console.log("===================");
        console.log("useEffect() is called");
        console.log(`isFull: ${isFull}`);
    });

    useEffect(() => {
        setIsfull(count >= MAX_CAPACITY);
        console.log(`Current count value: ${count}`);
    }, [count]);

    return(
        <div style={{ padding: 16 }}>
            <p>{`총 ${count}명 수용했습니다.`}</p>

            <button onClick={increaseCount} disabled={isFull}>
                입장
            </button>
            <button onClick={decreaseCount}>퇴장</button>

            {/* &&는 조건부 렌더링을 위해 사용, ㅁ && △ 에서 ㅁ가 true 일 때 실행됨. */}
            {isFull && <p style={{ color: "red" }}>정원이 가득 찼습니다.</p>}
        </div>
    );
}

export default Accommodate;