import * as _ from "lodash";
import * as React from "react";
import { useSwipeable } from "react-swipeable";
import { BREAKPOINTS, THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts, ITheme } from "src/modules/CSS";
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
    transition: all ${THEME_TRANSITION_TIME}s;
    user-select: none;
    position: relative;
    width: 100vw;
    padding: 1.5% 0;
    background: ${({ theme }) =>
        theme.name == "light"
            ? theme.colors.sectionBackground
            : tinycolor(theme.colors.sectionBackground)
                  .lighten(1)
                  .toRgbString()};
    color: ${({ theme }) => theme.colors.defaultText};
    font-size: 2.3rem;
    margin: 5% 0;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`;

const Caroussel = styled.div<{
    sliding: boolean;
    direction: IDirection;
    position: number;
    lastPosition: number;
}>`
    display: flex;
    transition: ${({ sliding }) =>
        sliding ? "none" : `transform ${SLIDE_TIME}ms ease`};
    transform: ${({ sliding, direction, position, lastPosition }) => {
        if (!sliding) {
            return `translateX(-${position * 100}%)`;
        }
        if (direction == "prev") {
            return `translateX(-${lastPosition * 100}%)`;
        }
        return `translateX(-${lastPosition * 100}%)`;
    }};
`;

const Item = styled.div<{ titlePosition: ITitlePosition }>`
    flex: 1 0 100%;
    flex-basis: 100%;
    padding: 0 10% 0 3%;
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

const TitleOuter = styled.div`
    display: table;
    grid-area: title;
`;

const TitleInner = styled.div`
    padding: 50% 0;
    height: 0;
`;

const Title = styled.div<ISectionItem>`
    font-size: 5.5rem;
    text-align: center;
    text-transform: uppercase;
    transform-origin: top left;
    transform: ${({ titlePosition }) =>
        titlePosition != "top" &&
        (titlePosition == "left"
            ? "rotate(-90deg) translate(-100%)"
            : "rotate(90deg) translate(0, -100%)")};
    margin-top: -50%;
    white-space: nowrap;
`;

const Content = styled.div`
    grid-area: content;
    text-align: justify;
    font-family: "${fonts.openSans.family}";
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
        width: 0.75rem;
        height: 0.75rem;
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
    const [lastPosition, setLastPosition] = React.useState(startIndex || 0);
    const [sliding, setSliding] = React.useState(false);
    const [direction, setDirection] = React.useState<IDirection>("next");

    const nextThrottled = React.useRef(
        _.throttle((pos: number) => {
            setDirection("next");
            setLastPosition(pos);
            setPosition(pos == items.length - 1 ? 0 : pos + 1);
            setSliding(true);
        }, SLIDE_TIME),
    );
    const prevThrottled = React.useRef(
        _.throttle((pos: number) => {
            setDirection("prev");
            setLastPosition(pos);
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
        setDirection(destination > position ? "next" : "prev");
        setLastPosition(position);
        setPosition(destination);
        setSliding(true);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case "ArrowLeft":
                prev();
                break;
            case "ArrowRight":
                next();
                break;
        }
    };
    const focus = (e: React.MouseEvent<HTMLDivElement>) =>
        e.currentTarget.focus();

    React.useEffect(() => {
        setSliding(false);
    }, [sliding]);

    return (
        <Wrapper
            theme={theme}
            {...swipeHandlers}
            tabIndex="0"
            onKeyDown={handleKeyDown}
            onClick={focus}
        >
            <Caroussel
                sliding={sliding}
                direction={direction}
                position={position}
                lastPosition={lastPosition}
            >
                {_.map(items, ({ titlePosition, title, content }, index) => (
                    <Item titlePosition={titlePosition || "left"} key={index}>
                        <TitleOuter>
                            <TitleInner>
                                <Title
                                    children={title}
                                    titlePosition={titlePosition || "left"}
                                />
                            </TitleInner>
                        </TitleOuter>
                        <Content children={content} />
                    </Item>
                ))}
            </Caroussel>
            <div
                style={{
                    textAlign: "center",
                    position: "absolute",
                    bottom: "0.25rem",
                    width: "100%",
                }}
            >
                {items.length > 1 &&
                    _.times(items.length, (i) => (
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
