import React from 'react';
import './content.css';

export const Highlight = () => {
    return (
        <div className='highlight'>
            <img src='image/image2.png' />
            <div className='text-content'>
                <div className='title-text'>ไร่สตรอเบอรี่ไผ่สีทอง</div>
                <div className='sub-text'>อำเภอสะเมิง จังหวัดเชียงใหม่</div>
            </div>
        </div>
    );
}

export const Content = () => {
    return (
        <div>
            <div>ที่นี่ มีอะไรดี</div>
            <div className='first-content'>
                <div>
                    ไร่ไผ่สีทอง เป็นไร่สตรอเบอรี่ที่บริหารและควบคุมคุณภาพของไร่ โดยคุณทองใบ ขัดตะละ ที่เป็นคนสะเมิงโดยกำเนิด <br/>
                    โดยได้พัฒนาไร่แห่งนี้ให้เป็นแหล่งท่องเที่ยวเชิงการเกษตรที่น่าสนใจ ซึ่งทางไร่จะมีกิจกรรมการเก็บเกี่ยวสตอเบอรี่ <br/>
                    ที่ภายในหนึ่งปี จะมีเพียงแค่หนึ่งครั้งเท่านั้น และนอกจากนี้ยังสามารถติดต่อเพื่อขอจองห้องพักกลางสวน <br/>
                    เพื่อพักผ่อน ภายใต้อากาศเย็นสบาย และยังได้ดื่มด่ำกับบรรยากาศของไร่สตรอเบอรี่อีกด้วย
                </div>
                <img src='image/image3.png' />
            </div>
            <div>สินค้า / ของฝาก</div>
            <div>ที่ตั้งและการเดินทาง</div>
            <div>
                <div>

                </div>
                <img src="image/map.png" />
            </div>
        </div>
    )
}

export const Comment = () => {
    return (
        <div>
            <div>รีวิว จากผู้เยี่ยมชม</div>
        </div>
    )
}