import random
import numpy as np
import math
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm


def cloud(Ex, En, He, n):
    xvalue = []
    yvalue = []
    for i in range(0, n):
        Enn = random.normalvariate(0, 1) * He + En
        x = random.normalvariate(0, 1) * Enn + Ex
        y = math.exp(-((x-Ex) ** 2) / (2 * Enn**2))
        xvalue.append(x)
        yvalue.append(y)
    return xvalue, yvalue


def cloud2D(Ex, Ey, Enx, Eny, Hex, Hey, n):
    xvalue, yvalue, zvalue = [], [], []
    for i in range(0, n):
        Ennx=random.normalvariate(0, 1)*Hex+Enx
        Enny=random.normalvariate(0, 1)*Hey+Eny
        x=random.normalvariate(0, 1)*Ennx+Ex
        y=random.normalvariate(0, 1)*Enny+Ey
        z=math.exp(
            -(
                (x-Ex)**2/(2*Ennx*Ennx) +
                (y-Ey)**2/(2*Enny*Enny)
            )
        )
        xvalue.append(x)
        yvalue.append(y)
        zvalue.append(z)
    return xvalue, yvalue, zvalue


def gao2D(Ex, Ey, Enx, Eny, Hex, Hey, n):
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    X, Y, Z = cloud2D(Ex, Ey, Enx, Eny, Hex, Hey, n)
    X = np.array(X)
    Y = np.array(Y)
    Z = np.array(Z)
    ax.scatter(X, Y, Z)
    plt.show()


def gao(Ex, En, He, n):
    xvalue, yvalue = cloud(Ex, En, He, n)
    plt.plot(xvalue, yvalue, '.')
    plt.grid(True)
    plt.show()
