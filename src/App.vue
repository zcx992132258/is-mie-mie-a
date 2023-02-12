<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Konva from 'konva';
import { log } from 'console';

const container = ref<HTMLDivElement>();

interface IGrid {
    top: number;
    left: number;
    right: number;
    bottom: number;
}

const defaultGrid: IGrid = {
    top: 100,
    right: 100,
    left: 100,
    bottom: 100,
};

interface IAxis {
    label: string;
    position: {
        x: number;
        y: number;
    };
}

const transFormNum = (num: number): number => {
    const strNum = num.toString();
    let cloneNum = num;
    const endIndex = strNum.length - 1;
    if (Number(strNum[endIndex]) !== 0) {
        let endNum = 10 - Number(strNum[endIndex]);
        cloneNum += endNum;
    }
    return cloneNum;
};

const createAxisText = (
    arr: number[],
    height: number,
    intervalNum = 5,
): IAxis[] => {
    const averageHeight = height / intervalNum;
    let maxNum = transFormNum(Math.ceil(Math.max(...arr)));
    const averageNumber = Math.ceil(maxNum / intervalNum);
    return new Array(intervalNum + 1)
        .fill(null)
        .map<IAxis>((v, index): IAxis => {
            return {
                label: (index * averageNumber < maxNum
                    ? index * averageNumber
                    : maxNum
                ).toString(),
                position: {
                    x: 0,
                    y: height - averageHeight * index,
                },
            };
        });
};

const createXAxisText = (arr: string[], width: number): IAxis[] => {
    const averageWidth = width / arr.length;
    return arr.map<IAxis>((v, index) => {
        return {
            label: v,
            position: {
                x: averageWidth * (index + 1),
                y: 0,
            },
        };
    });
};

onMounted(() => {
    if (container.value) {
        const { offsetHeight, offsetWidth } = container.value;

        const stage = new Konva.Stage({
            container: container.value,
            width: offsetWidth,
            height: offsetHeight,
        });
        const layer = new Konva.Layer();
        const series = [120, 200, 150, 80, 70, 110, 130];
        const xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const maxNum = transFormNum(Math.ceil(Math.max(...series)));
        const maxBarHeight =
            offsetHeight - defaultGrid.bottom - defaultGrid.top;
        const yAxis = createAxisText(series, offsetHeight - defaultGrid.bottom)
            .map((v) => {
                return {
                    ...v,
                    position: {
                        ...v.position,
                        x: 0 + defaultGrid.left - 30,
                        y:
                            v.position.y <= defaultGrid.top
                                ? defaultGrid.top
                                : v.position.y,
                    },
                };
            })
            .map((v) => {
                return new Konva.Text({
                    x: v.position.x,
                    y: v.position.y,
                    text: v.label,
                });
            })
            .forEach((v) => {
                layer.add(v);
            });

        createXAxisText(xData, offsetWidth - defaultGrid.left - 50)
            .map((v) => {
                return {
                    ...v,
                    position: {
                        ...v.position,
                        y: offsetHeight - defaultGrid.bottom + 20,
                    },
                };
            })
            .map((v, k) => {
                return {
                    text: new Konva.Text({
                        ...v.position,
                        text: v.label,
                    }),
                    rect: new Konva.Rect({
                        ...v.position,
                        height: (series[k] / maxNum) * maxBarHeight,
                        width: 20,
                        fill: 'green',
                        y:
                            v.position.y -
                            20 -
                            (series[k] / maxNum) * maxBarHeight,
                    }),
                };
            })
            .forEach((v) => {
                layer.add(v.text);
                layer.add(v.rect);
            });

        const xLine = new Konva.Line({
            points: [
                0 + defaultGrid.left,
                offsetHeight - defaultGrid.bottom,
                offsetWidth - defaultGrid.right,
                offsetHeight - defaultGrid.bottom,
            ],
            stroke: 'black',
            strokeWidth: 2,
            lineCap: 'butt',
        });
        const yLine = new Konva.Line({
            points: [
                0 + defaultGrid.left,
                offsetHeight - defaultGrid.bottom,
                0 + defaultGrid.left,
                0 + defaultGrid.top,
            ],
            stroke: 'black',
            strokeWidth: 2,
            lineCap: 'butt',
        });
        layer.add(yLine);
        layer.add(xLine);
        stage.add(layer);
    }
});
</script>

<template>
    <div id="app" ref="container"></div>
</template>

<style scoped lang="less">
#app {
    height: 100vh;
    width: 100vw;
}
</style>
