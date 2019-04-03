import * as _ from "lodash";
import * as React from "react";
import { useSwipeable } from "react-swipeable";
import { BREAKPOINTS } from "src/config";
import { Hooks } from "src/modules";
import { ITheme } from "src/modules/CSS";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const { useConnect } = Hooks;
const SLIDE_TIME = 1000;

type ITitlePosition = "top" | "right" | "left";
type IDirection = "next" | "prev";

interface ISectionItem {
    title?: React.ReactNode;
    content?: React.ReactNode;
    titlePosition?: ITitlePosition;
}

interface ISectionProps {
    items: ISectionItem[];
    startIndex?: number;
}

const Wrapper = styled.div<{ theme: ITheme }>`
    position: relative;
    width: 100vw;
    padding: 1% 0;
    background: ${({ theme }) => theme.colors.sectionBackground};
    font-size: 2.3rem;
    margin: 5% 0;
    overflow: hidden;
`;

const Caroussel = styled.div<{ sliding: boolean; direction: IDirection }>`
    display: flex;
    transition: ${({ sliding }) =>
        sliding ? "none" : `transform ${SLIDE_TIME}ms ease`};
    transform: ${({ sliding, direction }) => {
        if (!sliding) {
            return "translateX(-100%)";
        }
        if (direction == "prev") {
            return "translateX(-200%)";
        }
        return "translateX(0)";
    }};
`;

const Item = styled.div<{ titlePosition: ITitlePosition; order: number }>`
    flex: 1 0 100%;
    flex-basis: 100%;
    order: ${({ order }) => order};
    padding: 0 2.5%;
    display: grid;
    grid-template: ${({ titlePosition }) => {
        switch (titlePosition) {
            case "top":
                return "[title] 1fr [content] auto / [title content] auto";
            case "right":
                return "[title content] auto / [content] 1fr [title] auto";
            case "left":
                return "[title content] auto / [title] auto [content] 1fr";
        }
    }};
    grid-gap: 2.5rem;
`;

const Title = styled.div<ISectionItem>`
    font-size: 5.5rem;
    grid-area: title;
    text-align: center;
    transform: ${({ titlePosition }) =>
        titlePosition != "top" &&
        (titlePosition == "left" ? "rotate(-90deg)" : "rotate(90deg)")};
`;

const Content = styled.div`
    grid-area: content;
    text-align: justify;
`;

const Indicator = styled.div<{ active: boolean; theme: ITheme }>`
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 1.5rem;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    background-color: ${({ active, theme }) =>
        active
            ? theme.colors.defaultText
            : tinycolor(theme.colors.defaultText)
                  .setAlpha(0.5)
                  .toRgbString()};

    @media (min-width: ${BREAKPOINTS.smpx}) {
        width: 1rem;
        height: 1rem;
        margin: 0 0.75rem;
    }
`;

export default (props: ISectionProps) => {
    const { items, startIndex } = props;
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => next(),
        onSwipedRight: () => prev(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    // State
    const [position, setPosition] = React.useState(startIndex || 0);
    const [sliding, setSliding] = React.useState(false);
    const [direction, setDirection] = React.useState<IDirection>("next");

    const nextThrottled = React.useRef(
        _.throttle((pos: number) => {
            setDirection("next");
            setPosition(pos == items.length - 1 ? 0 : pos + 1);
            setSliding(true);
        }, SLIDE_TIME),
    );
    const prevThrottled = React.useRef(
        _.throttle((pos: number) => {
            setDirection("prev");
            setPosition(pos == 0 ? items.length - 1 : pos - 1);
            setSliding(true);
        }, SLIDE_TIME),
    );

    const next = () => {
        nextThrottled.current(position);
    };
    const prev = () => {
        prevThrottled.current(position);
    };
    const navigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const destination = Number(e.currentTarget.dataset.index);
        if (destination == position) {
            return;
        }
        setPosition(destination);
        setDirection(destination > position ? "next" : "prev");
        setSliding(true);
    };

    const getOrder = (itemIndex: number) =>
        (items.length + 1 - position + itemIndex) % items.length;

    React.useEffect(() => {
        setSliding(false);
    }, [sliding]);

    return (
        <Wrapper theme={theme} {...swipeHandlers}>
            <Caroussel sliding={sliding} direction={direction}>
                {_.map(items, ({ titlePosition, title, content }, index) => (
                    <Item
                        titlePosition={titlePosition || "left"}
                        key={index}
                        order={getOrder(index)}
                    >
                        <Title
                            children={title}
                            titlePosition={titlePosition || "left"}
                        />
                        <Content children={content} />
                    </Item>
                ))}
            </Caroussel>
            <div style={{ textAlign: "center" }}>
                {_.times(items.length, (i) => (
                    <Indicator
                        data-index={i}
                        theme={theme}
                        key={i}
                        active={i == position}
                        onClick={navigate}
                    />
                ))}
            </div>
        </Wrapper>
    );
};
